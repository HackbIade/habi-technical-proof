import { setSale } from '../routes';
import ThrowSwal from '../tools/ThrowSwal';
import { firebaseFunctions } from '../firebase';

const setSaleService = async (data) => {
  try {
    const request = firebaseFunctions.httpsCallable(setSale);
    await request(data);
    return;
  } catch (error) {
    ThrowSwal({ text: 'No fue posible vender esta pizza!' });
  }
};
export default setSaleService;
