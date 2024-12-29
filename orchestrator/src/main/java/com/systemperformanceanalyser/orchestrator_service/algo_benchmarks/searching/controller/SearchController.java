package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.controller;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchRequest;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchResult;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.service.SearchService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/algo-benchmarks/search")
@CrossOrigin(origins = "http://localhost:3000")  // For development
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping("execute")
    public ResponseEntity<SearchResult> executeSearch(@RequestBody SearchRequest request) {
        try {
            SearchResult result = searchService.orchestrateSearch(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


}
