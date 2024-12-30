package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.service;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.exception.SearchAlgorithmValidationError;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.AlgorithmType;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchRequest;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchResult;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SearchService {
    private static final String NUMBERS_AND_COMMAS_ONLY_REGEX = "^[1-9](,[1-9])*$";

    public SearchResult orchestrateSearch(SearchRequest request) {
        validateSearchRequest(request);
        return null;
    }

    private void validateSearchRequest(SearchRequest request) {
        // if null or empty
        if (request.getArray() == null || request.getArray().length() == 0)
            throw new SearchAlgorithmValidationError();
        if (request.getTarget() == null || request.getTarget().length() == 0)
            throw new SearchAlgorithmValidationError();
        if (request.getAlgorithm() == null ||  request.getAlgorithm().toString().length() == 0)
            throw new SearchAlgorithmValidationError();
        if (request.getLanguage() == null ||  request.getLanguage().toString().length() == 0)
            throw new SearchAlgorithmValidationError();

        int target = Integer.parseInt(request.getTarget());

        // 1. validate input array
        //  if  too long
        if (request.getArray().length() >= 1000)
            throw new SearchAlgorithmValidationError();

        // if comma seperated format
        Pattern pattern = Pattern.compile(NUMBERS_AND_COMMAS_ONLY_REGEX);
        Matcher matcher = pattern.matcher(request.getArray());
        if (!matcher.matches())
            throw new SearchAlgorithmValidationError();

        // if numbers are valid after removing numbers
        // might not need this thanks to above regex
        String[] charArray = request.getArray().split(",");
        for (int i=0; i<charArray.length; i++) {
            try {
                Integer.parseInt(charArray[i]);
            } catch (NumberFormatException e) {
                throw new SearchAlgorithmValidationError();
            }
        }

        // if numbers are sorted
        int[] intArray = new int[charArray.length];
        for (int i=0; i<charArray.length; i++) {
            intArray[i] = Integer.parseInt(charArray[i]);
            if (i != 0 && intArray[i] < intArray[i-1]) {
                throw new SearchAlgorithmValidationError();
            }
        }

        // 2 .validate target number
        // if number
        try {
            Integer.parseInt(request.getTarget());
        } catch (NumberFormatException e) {
            throw new SearchAlgorithmValidationError();
        }

        // if too long
        if (request.getTarget().length() >= 1000) throw new SearchAlgorithmValidationError();

        // if less than or higher than biggest number
        if (target < intArray[0] || target > intArray[intArray.length])
            throw new SearchAlgorithmValidationError();

        // 3. validate search method
        // if doesn't match enum type
        try {
            AlgorithmType.valueOf(request.getAlgorithm().toString());
        } catch (IllegalArgumentException e) {
            throw new SearchAlgorithmValidationError();
        }

        // 4. validate programming language
        // if doesn't match enum type
        try {
            AlgorithmType.valueOf(request.getAlgorithm().toString());
        } catch (IllegalArgumentException e) {
            throw new SearchAlgorithmValidationError();
        }

        // 5. validate instance type info (type, region etc)
    }

    private void setupComputeInstance()  {
        // prepares execution environment
    }

    private void executeSearchAlgorithm() {
        // call worker service
        // track execution time, memory usage etc.
        // capture success or failure
    }

    private void calculateResourceCost() {
        // compute instance costs
        // cost of other aws services
        // execution time etc.
    }

    private void saveTestResults(SearchResult result) {
        // record all metrics and results
    }

    private void buildSearchResponse() {
        // compile all results
        // format metrics
        // create final response object
    }

}
