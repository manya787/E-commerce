// sagas.js
import { put, call,takeEvery } from 'redux-saga/effects';
import { fetchProductDetailsSuccess,fetchProductDetailsFailure} from '../features/productDetailslice'
function* fetchData(action) {
  try {
    const response = yield call(fetch, `http://localhost:3001/api/product_details/${action.payload}`);
    const result = yield call([response, 'json']);
    yield put( fetchProductDetailsSuccess(result));
  } catch (error) {
    yield put(fetchProductDetailsFailure(error.message));
  }
}

export function* watchFetchDatadetails() {
  yield takeEvery('productDetails/fetchProductDetailsStart',fetchData);
 
}
export default watchFetchDatadetails;