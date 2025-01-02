import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import model.SearchRequest;
import model.SearchResult;

public class HandleSearch implements RequestHandler<SearchRequest, SearchResult> {

    private enum Algorithm {
        LINEAR, BINARY, JUMP, INTERPOLATION
    }

    @Override
    public SearchResult handleRequest(SearchRequest searchRequest, Context context) {

        // choose algorithm based on req
        BaseSearch searchAlgorithm = switch (Algorithm.valueOf(searchRequest.getAlgorithm())) {
            case LINEAR -> new LinearSearch();
            case BINARY -> new BinarySearch();
            case JUMP -> new JumpSearch();
            case INTERPOLATION -> new InterpolationSearch();
        };

        return searchAlgorithm.handleRequest(searchRequest, context);

    }
}
