// Bootstrap modals
const viewVoteModal = document.getElementById('viewVoteModal');
const regModal = document.getElementById('regModal');
const showRegModal = document.getElementById('showRegModal');
const addVoteModal = document.getElementById('addVoteModal');
const logonModal = document.getElementById('logonModal');

// Bootstrap modal headers, bodys and footers
const regFormModalBody = document.getElementById('regFormModalBody');
const regInfoModalBody = document.getElementById('regInfoModalBody');
const regFormModalFooter = document.getElementById('regFormModalFooter');
const regInfoModalFooter = document.getElementById('regInfoModalFooter');
const viewVoteModalHeader = document.getElementById('viewVoteModalHeader');
const viewVoteModalBody = document.getElementById('viewVoteModalBody');
const viewVoteModalFooter = document.getElementById('viewVoteModalFooter');

// Forms
const regForm = document.getElementById('regForm');
const loginForm = document.getElementById('loginForm');
const newVoteForm = document.getElementById('newVoteForm');

// Input fields
const regUsername = document.getElementById('regUsername');
const regFullName = document.getElementById('regFullName');
const regUser = document.getElementById('regUsername');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const newVoteTitle = document.getElementById('newVoteTitle');
const newVoteDescription = document.getElementById('newVoteDescription');

// Buttons
const regSubmitBtn = document.getElementById('regSubmit');
const regReturnBtn = document.getElementById('regInfoReturnBtn');
const logonBtn = document.getElementById('showLogonForm');
const logoutBtn = document.getElementById('logout');
const loginSubmitBtn = document.getElementById('loginSubmit');
const voteSubmitBtn = document.getElementById('voteSubmit');
const showAddVoteModalBtn = document.getElementById('showAddVoteModal');
const addNewVoteSubmitBtn = document.getElementById('addVoteSubmit');
const newVoteAddOptionBtn = document.getElementById('newVoteAddOption');

const voteDeleteBtn = document.createElement('button');
voteDeleteBtn.classList.add('btn', 'btn-danger');
voteDeleteBtn.textContent = 'Delete this vote';

// Spans
const userNameSpan = document.getElementById('user');

// Headings
const noVotesFoundError = document.createElement('h2');
noVotesFoundError.classList.add('text-center');
noVotesFoundError.textContent = 'No votes available!';
const noBackendConnectionError = document.createElement('h3');
noBackendConnectionError.classList.add('text-center');
noBackendConnectionError.textContent = 'Can not connect to the backend!';

// Divs
const errorDiv = document.createElement('div');
errorDiv.classList.add('d-flex', 'flex-column', "align-items-center", "justify-content-center", "vh-100");
errorDiv.appendChild(noVotesFoundError);
const mainContentDiv = document.getElementById('mainContentDiv');
mainContentDiv.appendChild(errorDiv);

const voteContainer = document.createElement('div');
voteContainer.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-xl-3', 'g-4');
voteContainer.id = 'voteContainer';

const newVoteOptionsDiv = document.getElementById('newVoteOptions');
const toastDiv = document.getElementById('toast');
const notificationMsg = document.getElementById('notificationMsg');
const navMenu = document.getElementById('navMenu');

export {
    viewVoteModal,
    regModal,
    showRegModal,
    addVoteModal,
    logonModal,
    regFormModalBody,
    regInfoModalBody,
    regFormModalFooter,
    regInfoModalFooter,
    viewVoteModalHeader,
    viewVoteModalBody,
    viewVoteModalFooter,
    regForm,
    loginForm,
    regUsername,
    regFullName,
    regUser,
    regPassword1,
    regPassword2,
    loginUsername,
    loginPassword,
    regSubmitBtn,
    regReturnBtn,
    logonBtn,
    logoutBtn,
    loginSubmitBtn,
    voteSubmitBtn,
    showAddVoteModalBtn,
    addNewVoteSubmitBtn,
    newVoteAddOptionBtn,
    voteDeleteBtn,
    newVoteForm,
    newVoteTitle,
    newVoteDescription,
    userNameSpan,
    mainContentDiv,
    voteContainer,
    newVoteOptionsDiv,
    toastDiv,
    navMenu,
    notificationMsg,
    errorDiv,
    noVotesFoundError,
    noBackendConnectionError
};