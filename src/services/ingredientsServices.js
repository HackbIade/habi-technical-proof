import { getIngredients } from '../routes';
import ThrowSwal from '../tools/ThrowSwal';
import { firebaseFunctions } from '../firebase';

const getIngredientsService = async () => {
  try {
    const request = firebaseFunctions.httpsCallable(getIngredients);
    const { data } = await request();
    return data;
  } catch (error) {
    ThrowSwal({ text: 'No fue posible obtener la lista de ingredientes!' });
    return [];
  }
};
export default getIngredientsService;
