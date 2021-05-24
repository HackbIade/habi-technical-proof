import { getPizzas } from '../routes';
import ThrowSwal from '../tools/ThrowSwal';
import { firebaseFunctions } from '../firebase';

const getPizzasService = async () => {
  try {
    const request = firebaseFunctions.httpsCallable(getPizzas);
    const { data } = await request();
    return data;
  } catch (error) {
    ThrowSwal({ text: 'No fue posible obtener la lista de pizzas!' });
    return [];
  }
};
export default getPizzasService;
