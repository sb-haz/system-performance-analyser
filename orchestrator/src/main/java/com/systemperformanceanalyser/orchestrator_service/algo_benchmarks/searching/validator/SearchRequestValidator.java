package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.validator;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.exception.SearchAlgorithmValidationError;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchRequest;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.AlgorithmType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.LanguageType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.MemorySize;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.Region;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class SearchRequestValidator {
    private static final int MAX_ARRAY_STRING_LENGTH = 100000;

    public void validateRequest(SearchRequest request) {
        if (request == null) {
            throw new SearchAlgorithmValidationError("request must not be empty");
        }

        int[] array = validateAndParseArray(request.getArray());
        validateTarget(request.getTarget());
        validateAlgorithm(request.getAlgorithm());
        validateLanguage(request.getLanguage());
        validateMemorySize(request.getMemorySize());
        validateRegion(request.getRegion());

        // Only sort if algorithm requires it
        if (requiresSortedArray(request.getAlgorithm())) {
            Arrays.sort(array);
        }
    }

    // if we need to sort
    private boolean requiresSortedArray(AlgorithmType algorithm) {
        return switch (algorithm) {
            case BINARY, INTERPOLATION, JUMP -> true;
            case LINEAR -> false;
        };
    }

    private int[] validateAndParseArray(String strArray) {
        if (strArray == null || strArray.isEmpty()) {
            throw new SearchAlgorithmValidationError("array must not be empty");
        }

//        if (strArray.length() > MAX_ARRAY_STRING_LENGTH) {
//            throw new SearchAlgorithmValidationError("input string too long");
//        }

        // format validation
        boolean validFormat = true;
        boolean expectingNumber = true;

        for (int i = 0; i < strArray.length(); i++) {
            char c = strArray.charAt(i);
            if (expectingNumber) {
                if (c == '-' || Character.isDigit(c)) {
                    expectingNumber = false;
                    continue;
                }
                validFormat = false;
                break;
            } else {
                if (Character.isDigit(c)) {
                    continue;
                }
                if (c == ',') {
                    expectingNumber = true;
                    continue;
                }
                validFormat = false;
                break;
            }
        }

        if (!validFormat || expectingNumber) {
            throw new SearchAlgorithmValidationError("array format must be numbers separated by commas");
        }

        return convertToIntArray(strArray);
    }

    private void validateTarget(String target) {
        try {
            Integer.parseInt(target);
        } catch (NumberFormatException e) {
            throw new SearchAlgorithmValidationError("target must be an int");
        }
    }

    private void validateAlgorithm(AlgorithmType algorithm) {
    }

    private void validateLanguage(LanguageType language) {
    }

    private void validateMemorySize(MemorySize memorySize) {
    }

    private void validateRegion(Region region) {
    }

    // helper
    private int[] convertToIntArray(String stringArray) {
        return Arrays.stream(stringArray.split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
    }
}