package com.systemperformanceanalyser.orchestrator_service.algo_benchmarks.searching.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum LanguageType {
    @JsonProperty("java") JAVA,
    @JsonProperty("python") PYTHON,
    @JsonProperty("javascript") JAVASCRIPT,
    @JsonProperty("csharp") CSHARP
}
