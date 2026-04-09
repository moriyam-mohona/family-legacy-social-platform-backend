import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import responseTime from "response-time";
import router from "./app/routes/index.js";
import config from "./config/index.js";
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import { setupSwagger } from "./utils/swagger.js";
import logger from "./utils/logger/logger.js";

// Initialize app
const app: Application = express();

// Cors Options
const corsOptions = {
  origin: config.env === "production" ? process.env.CORS_ORIGIN : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  // Express typings expect allowedHeaders, not ALLOWED_HEADERS. Passing custom props usually requires casting or matching the type.
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-client-type",
    "Accept",
    "Origin",
  ],
  credentials: true,
  exposedHeaders: [
    "Content-Range",
    "Content-Length",
    "Accept-Ranges",
    "Connection",
    "Upgrade",
  ],
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Initialize Swagger Docs
setupSwagger(app);

// Endpoints ( root )
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "API Server is running..",
  });
});

// Log incoming requests
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    const timeInMs = time.toFixed(2);
    const timeCategory =
      time < 100
        ? "VERY FAST"
        : time < 200
          ? "FAST"
          : time < 500
            ? "NORMAL"
            : time < 1000
              ? "SLOW"
              : time < 5000
                ? "VERY_SLOW"
                : "CRITICAL";

    // Skip logging for streaming requests to reduce noise
    if (!req.path.includes("/stream/")) {
      console.log(`[${timeCategory}] ${req.method} ${req.originalUrl} - ${timeInMs}ms`);

       logger.info({
        message: `Request processed - ${timeCategory}: ${timeInMs}ms - ${req.method} ${req.originalUrl}`,
        method: req.method,
        url: req.originalUrl,
        responseTime: `${timeInMs}ms`,
        timeCategory,
        statusCode: res.statusCode,
        // userAgent: req.get("User-Agent"),
        // ip: req.ip,
      });
    }

    // Alert for performance issues
    if (time > 1000) {
      console.warn(`[SLOW_RESPONSE] ${req.method} ${req.originalUrl} took ${timeInMs}ms`);
    }
  })
);

// Routes
app.use("/api/v1", router);

// Health check endpoint
app.get("/api/v1/health", async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Server health check failed",
      error: "Database connection failed",
    });
  }
});

app.use(GlobalErrorHandler);

// 404 Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
