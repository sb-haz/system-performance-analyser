package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.service;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.controller.SearchController;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.exception.SearchAlgorithmValidationError;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.*;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.*;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.validator.SearchRequestValidator;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.validator.SearchResultValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SearchService {

    private static final Logger logger = LoggerFactory.getLogger(SearchService.class);

    @Autowired
    private AWSLambda awsLambda;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SearchRequestValidator searchRequestValidator;
    @Autowired
    private SearchResultValidator lambdaResultValidator;
    @Autowired
    private SearchRequestSanitiser searchRequestSanitiser;

    public SearchResult performSearch(SearchRequest request) {
        try {
            searchRequestValidator.validateRequest(request);
            SearchRequest sanitisedSearchRequest = searchRequestSanitiser.sanitise(request);
            return invokeSearchLambda(sanitisedSearchRequest);
        } catch (Exception e) {
            return createErrorResult(request, e);
        }
    }

    private SearchResult invokeSearchLambda(SearchRequest request) {
        logger.info("starting lambda call process");
        try {
            String functionName = request.getLanguage().toString().toLowerCase()
                    + "-search-"
                    + request.getMemorySize().getValue();
            logger.debug("using lambda function: {}", functionName);

            String requestPayload = objectMapper.writeValueAsString(request);
            logger.debug("prepared request payload: {}", requestPayload);

            InvokeRequest invokeRequest = new InvokeRequest()
                    .withFunctionName(functionName)
                    .withPayload(requestPayload);

            logger.info("sending request to lambda");
            InvokeResult lambdaResult = awsLambda.invoke(invokeRequest);
            logger.info("received response from lambda");

            String responsePayload = new String(lambdaResult.getPayload().array());
            logger.debug("lambda raw response: {}", responsePayload);

            if (lambdaResult.getFunctionError() != null) {
                logger.error("lambda execution failed with error: {}", lambdaResult.getFunctionError());
                throw new RuntimeException("lambda function error: " + lambdaResult.getFunctionError());
            }

            try {
                logger.debug("trying to parse lambda response");
                SearchResult searchResult = objectMapper.readValue(responsePayload, SearchResult.class);
                logger.info("successfully parsed search result: {}", searchResult);

                lambdaResultValidator.validateRequest(searchResult);
                logger.debug("search result validation passed");

                return searchResult;

            } catch (Exception e) {
                logger.error("failed to parse lambda response: {}", e.getMessage());
                throw new RuntimeException("failed to parse lambda response", e);
            }

        } catch (Exception e) {
            logger.error("lambda call failed: {}", e.getMessage());
            return createErrorResult(request, e);
        }
    }


    private SearchResult createErrorResult(SearchRequest request, Exception error) {
        logger.error("creating error result");
        logger.error("error details: {}", error.getMessage(), error);

        return SearchResult.builder()
                .timestamp(new Date().toString())
                .timestampRaw(System.currentTimeMillis())
                .array(request.getArray())
                .target(request.getTarget())
                .algorithm(request.getAlgorithm())
                .language(request.getLanguage())
                .memorySize(request.getMemorySize())
                .region(request.getRegion())
                .timeTaken(0)
                .iterations(0)
                .comparisons(0)
                .cost(0)
                .executionStatus(ExecutionStatus.FAILED)
                .searchStatus(SearchStatus.NOT_FOUND)
                .foundIndex(-1)
                .build();
    }
}