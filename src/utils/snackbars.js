import Swal from 'sweetalert2'
export default class snackbar {
    showSuccessToast(title, message) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 15000,
            timerProgressBar: true,
        })
    }
    showErrorToast(message, status) {
        Swal.fire({
            icon: 'error',
            title: `Error code ${status}`,
            text: message,
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 15000,
            timerProgressBar: true,
        })
    }
    showWarningToast(message){
        Swal.fire({
            icon: 'warning',
            title: `Warning`,
            text: message,
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
        })
    }
}
