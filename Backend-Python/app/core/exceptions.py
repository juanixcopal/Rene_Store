from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse


class NotFoundError(Exception):
    def __init__(self, message: str):
        self.message = message


class ConflictError(Exception):
    def __init__(self, message: str):
        self.message = message


class UnauthorizedError(Exception):
    def __init__(self, message: str = "Credenciales incorrectas"):
        self.message = message


async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse(status_code=404, content={"message": exc.message, "status": 404})


async def conflict_handler(request: Request, exc: ConflictError):
    return JSONResponse(status_code=409, content={"message": exc.message, "status": 409})


async def unauthorized_handler(request: Request, exc: UnauthorizedError):
    return JSONResponse(status_code=401, content={"message": exc.message, "status": 401})


async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail, "status": exc.status_code},
    )


async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Error interno del servidor", "status": 500},
    )
