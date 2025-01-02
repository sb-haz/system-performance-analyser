import model.SearchRequest;
import model.SearchResult;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;

import java.time.Instant;
import java.util.Arrays;

public abstract class BaseSearch implements RequestHandler<SearchRequest, SearchResult> {

    private static final String EXECUTION_STATUS_SUCCESS = "SUCCESS";
    private static final String EXECUTION_STATUS_FAIL = "FAILED";
    private static final String SEARCH_STATUS_FOUND = "FOUND";
    private static final String SEARCH_STATUS_NOT_FOUND = "NOT_FOUND";

    protected long iterations = 0;
    protected long comparisons = 0;

    @Override
    public SearchResult handleRequest(SearchRequest searchRequest, Context context) {
        try {
            // reset for each request
            iterations = 0;
            comparisons = 0;

            // start timer
            long startTimeNanos = System.nanoTime();

            // call algo
            int[] nums = convertToIntArray(searchRequest.getArray());
            int target = Integer.parseInt(searchRequest.getTarget());
            int searchResult = search(nums, target);

            // end timer
            long endTimeNanos = System.nanoTime();
            double timeTakenSeconds = (endTimeNanos - startTimeNanos) / 1_000_000_000.0;

            // log info
            context.getLogger().log(String.format(
                    "metrics - time: %.6fs, iterations: %d, comparisons: %d",
                    timeTakenSeconds, iterations, comparisons
            ));

            return new SearchResult(
                    Instant.now().toString(),
                    System.currentTimeMillis(),
                    searchRequest.getArray(),
                    searchRequest.getTarget(),
                    searchRequest.getAlgorithm(),
                    searchRequest.getLanguage(),
                    searchRequest.getMemorySize(),
                    searchRequest.getRegion(),
                    iterations,
                    comparisons,
                    timeTakenSeconds,
                    0,
                    EXECUTION_STATUS_SUCCESS,
                    searchResult == -1 ? SEARCH_STATUS_NOT_FOUND : SEARCH_STATUS_FOUND,
                    searchResult
            );

        } catch (Exception e) {
            context.getLogger().log("error occurred: " + e.getMessage());
            return new SearchResult(
                    Instant.now().toString(),
                    System.currentTimeMillis(),
                    searchRequest.getArray(),
                    searchRequest.getTarget(),
                    searchRequest.getAlgorithm(),
                    searchRequest.getLanguage(),
                    searchRequest.getMemorySize(),
                    searchRequest.getRegion(),
                    0, 0, 0, 0,
                    EXECUTION_STATUS_FAIL,
                    SEARCH_STATUS_NOT_FOUND,
                    -1
            );
        }
    }

    protected abstract int search(int[] nums, int target);

    protected int[] convertToIntArray(String stringArray) {
        return Arrays.stream(stringArray.split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
    }
}