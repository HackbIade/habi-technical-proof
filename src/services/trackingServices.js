import { getTracking } from '../routes';
import ThrowSwal from '../tools/ThrowSwal';
import { firebaseFunctions } from '../firebase';

const getTrackingService = async (filters) => {
  try {
    const request = firebaseFunctions.httpsCallable(getTracking);
    const { data } = await request(filters);
    return data;
  } catch (error) {
    ThrowSwal({ text: 'No fue posible obtener la lista de seguimiento!' });
    return [];
  }
};
export default getTrackingService;
