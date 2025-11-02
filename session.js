class SessionManager {
    static isLoggedIn() {
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        const sessionActive = localStorage.getItem('sessionActive');
        const currentUser = localStorage.getItem('currentUser');
        
        if (!userLoggedIn || !currentUser) {
            return false;
        }
        
        try {
            const userData = JSON.parse(currentUser);
            if (userData.sessionExpiry && new Date().getTime() > userData.sessionExpiry) {
                this.clearSession();
                return false;
            }
        } catch (e) {
            this.clearSession();
            return false;
        }
        
        return true;
    }
    
    static clearSession() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionActive');
    }
    
    static extendSession() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                const userData = JSON.parse(currentUser);
                userData.sessionExpiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // Extend by 7 days
                localStorage.setItem('currentUser', JSON.stringify(userData));
            } catch (e) {
                console.error('Failed to extend session');
            }
        }
    }
    
    static requireAuth() {
        if (!this.isLoggedIn()) {
            const hasVisited = localStorage.getItem('hasVisited');
            if (hasVisited) {
                const continueAsGuest = confirm('Your session has expired. Continue as guest or login again?\n\nClick OK to continue as guest, Cancel to login.');
                if (continueAsGuest) {
                    localStorage.setItem('userLoggedIn', 'guest');
                    localStorage.setItem('currentUser', JSON.stringify({
                        fullName: 'Guest User',
                        sessionExpiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 1 day for guest
                    }));
                    return true;
                }
            }
            window.location.href = 'login.html';
            return false;
        }

        this.extendSession();
        return true;
    }
}

// Auto-extend session on user activity
let activityTimer;
function resetActivityTimer() {
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        if (SessionManager.isLoggedIn()) {
            SessionManager.extendSession();
        }
    }, 30000); // Extend session every 30 seconds of activity
}

// Listen for user activity
document.addEventListener('click', resetActivityTimer);
document.addEventListener('keypress', resetActivityTimer);
document.addEventListener('scroll', resetActivityTimer);