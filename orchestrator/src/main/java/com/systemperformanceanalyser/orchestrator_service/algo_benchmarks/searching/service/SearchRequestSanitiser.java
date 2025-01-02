package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.service;

import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.SearchRequest;
import com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums.AlgorithmType;
import org.springframework.stereotype.Service;

@Service
public class SearchRequestSanitiser {
    public SearchRequest sanitise(SearchRequest request) {

        return request;
    }
}
