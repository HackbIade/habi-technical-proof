import Swal from 'sweetalert2';

const ThrowSwal = ({ title, text, icon = 'error', ...rest }) =>
  Swal.fire({
    title: icon === 'error' ? title || 'Error!' : title,
    text,
    icon,
    ...rest
  });

export default ThrowSwal;
