/**
 * Author: Dipak Majumdar
 * date:  2024-11-27
 * description: A toast plugin for Bootstrap 4.6 created for seamless toast implementation without jquery.
 */

function showToast(message, options = {}) {
    const {
        title = 'Notification',       // Default title
        delay = 4000,                 // Delay in milliseconds
        smallText = 'Just now',       // Small text (e.g., timestamp)
    } = options;

    function getCurrentDirectoryPath() {
        try {
            throw new Error(); // Capture stack trace
        } catch (e) {
            const stackLines = e.stack.split('\n');
            const callerLine = stackLines[2] || stackLines[1];
            const pathMatch = callerLine.match(/(http[s]?:\/\/.*?)(?::\d+){2}/);
            console.log(pathMatch);
            if (pathMatch) {
                const fullPath = pathMatch[1];
                return fullPath.substring(0, fullPath.lastIndexOf('/')); // Remove file name
            }
            return null;
        }
    }

    // Define toast styles
    let headerBg = '';
    let headerText = '';
    let bodyText = '';
    let iconSrc = '';

    if (title.toLowerCase() === 'success') {
        headerBg = 'bg-primary';
        headerText = 'text-light';
        bodyText = 'text-primary';
        iconSrc = getCurrentDirectoryPath() + '/assets/tick.png';
    } else if (title.toLowerCase() === 'error') {
        headerBg = 'bg-danger';
        headerText = 'text-light';
        bodyText = 'text-danger';
        iconSrc = getCurrentDirectoryPath() + '/assets/error.png';
    } else if (title.toLowerCase() === 'failed') {
        headerBg = 'bg-danger';
        headerText = 'text-light';
        bodyText = 'text-danger';
        iconSrc = getCurrentDirectoryPath() + '/assets/error.png';
    } else if (title.toLowerCase() === 'warning') {
        headerBg = 'bg-warning';
        headerText = 'text-dark';
        bodyText = 'text-warning';
        iconSrc = getCurrentDirectoryPath() + '/assets/warning.png';
    } else if (title.toLowerCase() === 'info') {
        headerBg = 'bg-info';
        headerText = 'text-light';
        bodyText = 'text-info';
        iconSrc = getCurrentDirectoryPath() + '/assets/info.png';
    } else {
        headerBg = 'bg-secondary';
        headerText = 'text-light';
        bodyText = 'text-secondary';
    }

    // Create toast container if not already present
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        document.body.appendChild(toastContainer);
    }

    // Add toast HTML
    toastContainer.innerHTML = `
        <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 1100; right: 0; top: 0;">
            <div id="bootstrap-toast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="${delay}">
                <div class="toast-header ${headerBg} ${headerText}">
                    <img src="${iconSrc}" class="rounded mr-2">
                    <strong class="mr-auto text-capitalize">${title}</strong>
                    <small>${smallText}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body ${bodyText}">${message}</div>
            </div>
        </div>`;

    // Find the toast element
    const toastElement = document.getElementById('bootstrap-toast');
    
    // Initialize and show toast using Bootstrap's native JavaScript API
    const toastInstance = new bootstrap.Toast(toastElement, { delay });
    toastInstance.show();
}
