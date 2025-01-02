package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.controller;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchRequest;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchResult;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.service.SearchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("algos/search")
@CrossOrigin(origins = {"${app.cors.allowed-origins}"})
public class SearchController {

    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping
    public ResponseEntity<SearchResult> search(@Validated @RequestBody SearchRequest request) {
        logger.info("Search request: {}", request.toString());

        try {
            SearchResult result = searchService.performSearch(request);
            logger.info("Search result: {}", result.toString());
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid request parameters: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            logger.error("Error processing search request", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}