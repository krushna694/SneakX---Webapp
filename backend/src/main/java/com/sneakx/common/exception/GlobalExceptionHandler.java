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

import com.sneakx.common.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(BadRequestException.class)
        public ResponseEntity<ApiResponse<Void>> handleBadRequest(
                        BadRequestException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                exception.getMessage());
        }

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(
                        ResourceNotFoundException exception) {

                return buildResponse(
                                HttpStatus.NOT_FOUND,
                                exception.getMessage());
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(
                        MethodArgumentNotValidException exception) {

                Map<String, String> errors = new LinkedHashMap<>();

                for (FieldError error : exception.getBindingResult().getFieldErrors()) {
                        errors.putIfAbsent(
                                        error.getField(),
                                        error.getDefaultMessage());
                }

                ApiResponse<Map<String, String>> response = new ApiResponse<>(
                                false,
                                "Request validation failed",
                                errors);

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ApiResponse<Void>> handleIllegalArgument(
                        IllegalArgumentException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                exception.getMessage());
        }

        @ExceptionHandler(IllegalStateException.class)
        public ResponseEntity<ApiResponse<Void>> handleIllegalState(
                        IllegalStateException exception) {

                return buildResponse(
                                HttpStatus.CONFLICT,
                                exception.getMessage());
        }

        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ApiResponse<Void>> handleDataIntegrityViolation(
                        DataIntegrityViolationException exception) {

                return buildResponse(
                                HttpStatus.CONFLICT,
                                "The request conflicts with existing data");
        }

        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<ApiResponse<Void>> handleInvalidJson(
                        HttpMessageNotReadableException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                "Request body is invalid");
        }

        @ExceptionHandler(MissingServletRequestParameterException.class)
        public ResponseEntity<ApiResponse<Void>> handleMissingParameter(
                        MissingServletRequestParameterException exception) {

                return buildResponse(
                                HttpStatus.BAD_REQUEST,
                                "Required parameter is missing: "
                                                + exception.getParameterName());
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ApiResponse<Void>> handleAccessDenied(
                        AccessDeniedException exception) {

                return buildResponse(
                                HttpStatus.FORBIDDEN,
                                "Access denied");
        }

        @ExceptionHandler(NoResourceFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleNoResourceFound(
                        NoResourceFoundException exception) {

                return buildResponse(
                                HttpStatus.NOT_FOUND,
                                "Requested resource was not found");
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleGenericException(
                        Exception exception,
                        WebRequest request) {

                return buildResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "An unexpected error occurred");
        }

        private ResponseEntity<ApiResponse<Void>> buildResponse(
                        HttpStatus status,
                        String message) {

                return ResponseEntity
                                .status(status)
                                .body(ApiResponse.error(message));
        }
}