package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.validator;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SearchResultValidator {
    private static final Logger logger = LoggerFactory.getLogger(SearchResultValidator.class);

    public void validateRequest(SearchResult result) {
        logger.debug("validating search result");
        List<String> errors = new ArrayList<>();

        // metadata validation
        if (result.getTimestamp() == null || result.getTimestamp().isEmpty()) {
            errors.add("timestamp is missing");
        }
        if (result.getTimestampRaw() <= 0) {
            errors.add("timestamp raw value is invalid");
        }

        // input validation
        if (result.getArray() == null || result.getArray().isEmpty()) {
            errors.add("array is missing");
        }
        if (result.getTarget() == null || result.getTarget().isEmpty()) {
            errors.add("target is missing");
        }
        if (result.getAlgorithm() == null) {
            errors.add("algorithm is missing");
        }
        if (result.getLanguage() == null) {
            errors.add("language is missing");
        }
        if (result.getMemorySize() == null) {
            errors.add("memory size must be positive");
        }
        if (result.getRegion() == null) {
            errors.add("region is missing");
        }

        // metrics validation
        if (result.getIterations() < 0) {
            errors.add("iterations cannot be negative");
        }
        if (result.getComparisons() < 0) {
            errors.add("comparisons cannot be negative");
        }
        if (result.getTimeTaken() < 0) {
            errors.add("time taken cannot be negative");
        }
        if (result.getCost() < 0) {
            errors.add("cost cannot be negative");
        }

        // results validation
        if (result.getExecutionStatus() == null) {
            errors.add("execution status is missing");
        }
        if (result.getSearchStatus() == null) {
            errors.add("search status is missing");
        }
        if (result.getFoundIndex() < -1) {
            errors.add("found index cannot be less than -1");
        }

        // if any errors throw exception
        if (!errors.isEmpty()) {
            String errorMessage = String.join(", ", errors);
            logger.error("search result validation failed: {}", errorMessage);
            throw new IllegalStateException("invalid search result: " + errorMessage);
        }
    }
}