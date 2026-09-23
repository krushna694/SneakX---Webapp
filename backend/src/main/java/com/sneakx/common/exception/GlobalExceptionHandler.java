package com.sneakx.common.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

        // ==========================================
        // 400 - Bad Request
        // ==========================================

        @ExceptionHandler(BadRequestException.class)
        public ResponseEntity<Map<String, Object>> handleBadRequest(
                        BadRequestException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                "BAD_REQUEST",
                                exception.getMessage());
        }

        // ==========================================
        // 404 - Resource Not Found
        // ==========================================

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<Map<String, Object>> handleResourceNotFound(
                        ResourceNotFoundException exception) {

                return buildResponse(
                                HttpStatus.NOT_FOUND,
                                "NOT_FOUND",
                                exception.getMessage());
        }

        // ==========================================
        // 400 - Validation Errors
        // ==========================================

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, Object>> handleValidationErrors(
                        MethodArgumentNotValidException exception) {

                Map<String, Object> response = new LinkedHashMap<>();

                response.put("status", HttpStatus.BAD_REQUEST.value());
                response.put("error", "VALIDATION_ERROR");
                response.put("message", "Request validation failed");

                Map<String, String> errors = new LinkedHashMap<>();

                for (FieldError error : exception.getBindingResult().getFieldErrors()) {
                        errors.putIfAbsent(
                                        error.getField(),
                                        error.getDefaultMessage());
                }

                response.put("fieldErrors", errors);

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        // ==========================================
        // 400 - Illegal Argument
        // ==========================================

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<Map<String, Object>> handleIllegalArgument(
                        IllegalArgumentException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                "BAD_REQUEST",
                                exception.getMessage());
        }

        // ==========================================
        // 409 - Illegal State
        // ==========================================

        @ExceptionHandler(IllegalStateException.class)
        public ResponseEntity<Map<String, Object>> handleIllegalState(
                        IllegalStateException exception) {

                return buildResponse(
                                HttpStatus.CONFLICT,
                                "CONFLICT",
                                exception.getMessage());
        }

        // ==========================================
        // 409 - Database Constraint Violation
        // ==========================================

        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<Map<String, Object>> handleDataIntegrityViolation(
                        DataIntegrityViolationException exception) {

                return buildResponse(
                                HttpStatus.CONFLICT,
                                "CONFLICT",
                                "The request conflicts with existing data");
        }

        // ==========================================
        // 400 - Invalid JSON
        // ==========================================

        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<Map<String, Object>> handleInvalidJson(
                        HttpMessageNotReadableException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                "INVALID_REQUEST",
                                "Request body is invalid");
        }

        // ==========================================
        // 400 - Missing Request Parameter
        // ==========================================

        @ExceptionHandler(MissingServletRequestParameterException.class)
        public ResponseEntity<Map<String, Object>> handleMissingParameter(
                        MissingServletRequestParameterException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                "MISSING_PARAMETER",
                                "Required parameter is missing: "
                                                + exception.getParameterName());
        }

        // ==========================================
        // 403 - Access Denied
        // ==========================================

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<Map<String, Object>> handleAccessDenied(
                        AccessDeniedException exception) {

                return buildResponse(
                                HttpStatus.FORBIDDEN,
                                "FORBIDDEN",
                                "Access denied");
        }

        // ==========================================
        // 404 - Resource Not Found
        // ==========================================

        @ExceptionHandler(NoResourceFoundException.class)
        public ResponseEntity<Map<String, Object>> handleNoResourceFound(
                        NoResourceFoundException exception) {

                return buildResponse(
                                HttpStatus.NOT_FOUND,
                                "NOT_FOUND",
                                "Requested resource was not found");
        }

        // ==========================================
        // 500 - Unexpected Server Error
        // ==========================================

        @ExceptionHandler(Exception.class)
        public ResponseEntity<Map<String, Object>> handleGenericException(
                        Exception exception,
                        WebRequest request) {

                /*
                 * Do not expose internal exception details
                 * to the client.
                 */
                return buildResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "INTERNAL_SERVER_ERROR",
                                "An unexpected error occurred");
        }

        // ==========================================
        // Common Response Builder
        // ==========================================

        private ResponseEntity<Map<String, Object>> buildResponse(
                        HttpStatus status,
                        String error,
                        String message) {

                Map<String, Object> response = new LinkedHashMap<>();

                response.put("status", status.value());
                response.put("error", error);
                response.put("message", message);

                return ResponseEntity
                                .status(status)
                                .body(response);
        }
}