const state = {
    playerName: "",
    playerAvatar: "https://i.pravatar.cc/150?img=5",
    contacts: [],
    currentContact: null,
    messages: [],
    groupChats: [],
    clues: [],
    notes: "",
    progress: 0,
    gameStarted: false
};

const characters = {
    unknown: {
        id: "unknown",
        name: "???",
        gender: "male",
        status: "Online",
        avatar: "https://i.pravatar.cc/150?img=10",
        bio: "Mysterious user",
        chats: [
            { type: "received", text: "Kamu seharusnya tidak ada di sini.", delay: 1000 },
            { type: "received", text: "Tapi karena kamu sudah di sini... mungkin kamu bisa membantu.", delay: 2000 },
            { type: "received", text: "Icha menghilang 2 tahun lalu. Polisi menyerah, tapi aku tahu ini belum selesai.", delay: 3000 },
            { type: "received", text: "Bicaralah dengan teman-temannya. Seseorang pasti tahu sesuatu.", delay: 4000, trigger: "unlockContacts" }
        ],
        responses: [
            {
                pattern: /\b(siapa|nama(?:mu)?|identitas(?:mu)?)\b.*\b(kamu|anda)\b|\b(kamu|anda)\b.*\b(siapa|nama(?:mu)?|identitas(?:mu)?)\b/i,
                response: "Itu tidak penting. Fokus pada menemukan Icha."
            },
            {
                pattern: /\b(kenapa|mengapa|kok)\b.*\b(aku|saya|gua)\b|\b(aku|saya|gua)\b.*\b(kenapa|mengapa|kok)\b/i,
                response: "Kamu ada di sini, bukan? Mungkin ini takdir."
            },
            {
                pattern: /\b(icha|icha hilang|tentang icha|dimana icha|icha ke mana|kehilangan icha)\b/i,
                response: "Ya, Icha. Terakhir terlihat di perpustakaan tua di pusat kota. Mulailah dari sana."
            }
        ]
        
    },
    icha: {
        id: "icha",
        name: "Icha",
        gender: "female",
        status: "Offline",
        avatar: "https://i.pravatar.cc/150?img=3",
        bio: "Missing for 2 years",
        locked: true,
        chats: [
            { type: "received", text: "Halo? Ada orang di sana?", delay: 1000 },
            { type: "received", text: "Aku... aku tidak tahu aku di mana.", delay: 3000 },
            { type: "received", text: "Gelap. Aku dengar tetesan air.", delay: 5000 },
            { type: "received", text: "Cari buku catatan merah. Di situ semua jawabannya.", delay: 7000, trigger: "addClue", clue: "Buku catatan merah berisi informasi penting" },
            { type: "received", text: "[Koneksi terputus]", delay: 9000 }
        ],
        responses: [
            { pattern: /di\s?mana/i, response: "Aku tidak tahu... dingin. Ada pipa di langit-langit." },
            { pattern: /siapa.*(culik|menculik)/i, response: "Aku tidak pernah melihat wajahnya. Dia memakai topeng." },
            { pattern: /buku.*(catatan|notebook).*merah/i, response: "Itu ada di tasku... ada huruf R.S. di sampulnya." }
        ]

    },
    ryan: {
        id: "ryan",
        name: "Ryan S.",
        gender: "male",
        status: "Online",
        avatar: "https://i.pravatar.cc/150?img=7",
        bio: "Icha's ex-boyfriend",
        locked: true,
        chats: [
            { type: "received", text: "Siapa ini? Bagaimana kamu dapat nomor ini?", delay: 1000 },
            { type: "received", text: "Icha? Itu sudah lama sekali.", delay: 3000 },
            { type: "received", text: "Kami putus beberapa bulan sebelum dia menghilang.", delay: 5000 },
            { type: "received", text: "Dengar, aku tidak tahu apa-apa. Bicaralah dengan Fiona.", delay: 7000, trigger: "unlockContact", contactId: "fiona" }
        ],
        responses: [
            { pattern: /kamu.*(di\s?waktu|saat).*itu/i, response: "Aku sedang keluar kota akhir pekan itu. Banyak saksi." },
            { pattern: /fiona/i, response: "Ya, Fiona. Mereka satu kamar. Sedekat saudara." },
            { pattern: /buku.*merah/i, response: "Apa? Tidak, aku tidak tahu apa-apa soal itu.", trigger: "addClue", clue: "Ryan tampak gugup saat ditanya soal buku catatan merah" }
        ]

    },
    fiona: {
        id: "fiona",
        name: "Fiona L.",
        gender: "female",
        status: "Online",
        avatar: "https://i.pravatar.cc/150?img=9",
        bio: "Icha's best friend",
        locked: true,
        chats: [
            { type: "received", text: "Halo? Oh... kamu tanya tentang Icha.", delay: 1000 },
            { type: "received", text: "Sudah dua tahun, tapi rasanya masih sakit.", delay: 3000 },
            { type: "received", text: "Dia bersikap aneh sebelum menghilang.", delay: 5000 },
            { type: "received", text: "Dia terus bicara tentang proyek di perpustakaan.", delay: 7000, trigger: "addClue", clue: "Icha sedang mengerjakan proyek rahasia di perpustakaan" },
            { type: "received", text: "Joshua mungkin tahu lebih banyak. Dia orang terakhir yang melihatnya.", delay: 9000, trigger: "unlockContact", contactId: "joshua" }
        ],
        responses: [
            { pattern: /proyek/i, response: "Sesuatu tentang arsip kota lama. Dia semangat tapi juga takut." },
            { pattern: /buku.*merah/i, response: "Buku catatan merah? Ya, dia selalu membawanya. Polisi tidak pernah menemukannya." },
            { pattern: /joshua/i, response: "Joshua Carter. Bekerja di perpustakaan. Mereka sering bertemu beberapa minggu sebelum..." }
        ]

    },
    joshua: {
        id: "joshua",
        name: "Joshua C.",
        gender: "male",
        status: "Online",
        avatar: "https://i.pravatar.cc/150?img=12",
        bio: "Library archivist",
        locked: true,
        chats: [
            { type: "received", text: "Ya? Oh, tentang Icha...", delay: 1000 },
            { type: "received", text: "Dia sedang meneliti terowongan air tua di bawah kota.", delay: 3000 },
            { type: "received", text: "Menemukan kejanggalan di cetak biru tahun 1920-an.", delay: 5000 },
            { type: "received", text: "Katanya dia menemukan ruangan rahasia. Ingin menyelidikinya.", delay: 7000, trigger: "addClue", clue: "Ruangan rahasia di terowongan air" },
            { type: "received", text: "Aku sudah memperingatkan dia itu berbahaya...", delay: 9000 }
        ],
        responses: [
            { pattern: /ruangan.*rahasia/i, response: "Menurut catatannya, itu dekat stasiun katup nomor 4. Tapi terowongan itu seperti labirin." },
            { pattern: /buku.*merah/i, response: "Dia mencatat semuanya di situ. Pernah tertinggal di sini... ada sketsa terowongan." },
            { pattern: /siapa.*(tahu|lain)/i, response: "Hanya aku, kurasa. Kecuali dia cerita ke orang lain.", trigger: "addClue", clue: "Icha mungkin memberitahu orang lain tentang penemuannya" }
        ]
    }
};

const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const startGameBtn = document.getElementById('start-game');
const playerDisplayName = document.getElementById('player-display-name');
const contactsList = document.getElementById('contacts-list');
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const currentContactName = document.getElementById('current-contact-name');
const currentContactStatus = document.getElementById('current-contact-status');
const currentContactAvatar = document.getElementById('current-contact-avatar');
const typingIndicator = document.getElementById('typing-indicator');
const cluesBtn = document.getElementById('clues-btn');
const cluesModal = document.getElementById('clues-modal');
const closeCluesBtn = document.getElementById('close-clues');
const cluesList = document.getElementById('clues-list');
const notesBtn = document.getElementById('notes-btn');
const notesModal = document.getElementById('notes-modal');
const closeNotesBtn = document.getElementById('close-notes');
const notesTextarea = document.getElementById('notes-textarea');
const saveNotesBtn = document.getElementById('save-notes');

function initGame() {
    const savedGame = localStorage.getItem('darkChatGame');
    if (savedGame) {
        const savedState = JSON.parse(savedGame);
        Object.assign(state, savedState);

        introScreen.innerHTML = `
            <h1 class="text-4xl font-bold mb-6 text-blue-400 glitch" data-text="Misteri Dunia Gelap">Misteri Dunia Gelap</h1>
            <div class="max-w-md text-center mb-8 text-white">
                <p class="mb-4">Selamat datang kembali, ${state.playerName}. Lanjutkan penyelidikanmu?</p>
                <p>Kamu telah menemukan ${state.clues.length} petunjuk sejauh ini.</p>
            </div>
            <div class="w-full max-w-xs">
                <button id="continue-game" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 mb-2">
                    Lanjutkan Penyelidikan
                </button>
                <button id="new-game" class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    Mulai Permainan Baru
                </button>
            </div>
        `;

        document.getElementById('continue-game').addEventListener('click', startGame);
        document.getElementById('new-game').addEventListener('click', () => {
            localStorage.removeItem('darkChatGame');
            location.reload();
        });
    }

    startGameBtn.addEventListener('click', startGame);
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    cluesBtn.addEventListener('click', showClues);
    closeCluesBtn.addEventListener('click', hideClues);
    notesBtn.addEventListener('click', showNotes);
    closeNotesBtn.addEventListener('click', hideNotes);
    saveNotesBtn.addEventListener('click', saveNotes);

    if (state.notes) {
        notesTextarea.value = state.notes;
    }
}

function startGame() {
    let name = playerNameInput.value.trim();

    if (!name && state.playerName) {
        name = state.playerName;
    }

    if (name.length < 3 || name.length > 20) {
        alert("Please enter a name between 3 and 20 characters.");
        return;
    }

    state.playerName = name;
    playerDisplayName.textContent = name;

    state.contacts = [characters.unknown];
    renderContacts();

    introScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    setTimeout(() => {
        selectContact('unknown');
    }, 500);

    saveGame();
}

function renderContacts() {
    contactsList.innerHTML = '';

    state.contacts.forEach(contact => {
        const contactEl = document.createElement('div');
        contactEl.className = `p-3 border-b border-gray-700 flex items-center cursor-pointer hover:bg-gray-700 ${contact.locked ? 'opacity-50' : ''}`;
        contactEl.dataset.contactId = contact.id;

        if (contact.locked) {
            contactEl.innerHTML = `
                <div class="w-10 h-10 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                    <i class="fas fa-lock text-gray-500"></i>
                </div>
                <div class="flex-1">
                    <div class="font-bold">${contact.name}</div>
                    <div class="text-xs text-gray-400">Locked</div>
                </div>
            `;
        } else {
            contactEl.innerHTML = `
                <img src="${contact.avatar}" alt="${contact.name}" class="w-10 h-10 rounded-full mr-3">
                <div class="flex-1">
                    <div class="font-bold">${contact.name}</div>
                    <div class="text-xs ${contact.status === 'Online' ? 'text-green-500' : 'text-gray-500'}">${contact.status}</div>
                </div>
                ${contact.unread ? '<span class="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">' + contact.unread + '</span>' : ''}
            `;

            contactEl.addEventListener('click', () => selectContact(contact.id));
        }

        contactsList.appendChild(contactEl);
    });
}

function selectContact(contactId) {
    const contact = characters[contactId];

    if (contact.locked) return;

    state.currentContact = contactId;

    currentContactName.textContent = contact.name;
    currentContactStatus.textContent = contact.status;
    currentContactStatus.className = `text-sm ${contact.status === 'Online' ? 'text-green-500' : 'text-gray-400'}`;
    currentContactAvatar.src = contact.avatar;

    messageInput.disabled = false;
    sendBtn.disabled = false;

    messagesContainer.innerHTML = '';

    const existingMessages = state.messages.filter(msg => msg.contactId === contactId);

    if (existingMessages.length > 0) {

        existingMessages.forEach(msg => {
            addMessageToChat(msg.type, msg.text, msg.contactId);
        });
    } else if (contact.chats.length > 0) {

        startConversation(contact);
    } else {

        addMessageToChat('received', "Start the conversation...", contactId);
    }

    const contactObj = state.contacts.find(c => c.id === contactId);
    if (contactObj && contactObj.unread) {
        contactObj.unread = 0;
        renderContacts();
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function startConversation(contact) {
    contact.chats.forEach((chat, index) => {
        setTimeout(() => {
            addMessageToChat(chat.type, chat.text, contact.id);

            if (chat.trigger) {
                setTimeout(() => {
                    handleTrigger(chat.trigger, chat);
                }, 1000);
            }

            saveMessage(chat.type, chat.text, contact.id);
        }, chat.delay);
    });
}

function addMessageToChat(type, text, contactId) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type === 'sent' ? 'sender' : 'receiver'}`;
    messageEl.innerHTML = `
        <div class="text-sm ${type === 'sent' ? 'text-blue-100' : 'text-gray-100'}">${text}</div>
        <div class="text-xs mt-1 ${type === 'sent' ? 'text-blue-300' : 'text-gray-500'} text-right">
            ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
    `;

    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (type === 'received' && state.currentContact !== contactId) {
        const contact = state.contacts.find(c => c.id === contactId);
        if (contact) {
            contact.unread = (contact.unread || 0) + 1;
            renderContacts();
        }
    }
}

function saveMessage(type, text, contactId) {
    state.messages.push({
        type,
        text,
        contactId,
        timestamp: new Date().toISOString()
    });

    saveGame();
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !state.currentContact) return;

    addMessageToChat('sent', text, state.currentContact);
    saveMessage('sent', text, state.currentContact);

    messageInput.value = '';

    typingIndicator.classList.remove('hidden');

    setTimeout(() => {
        typingIndicator.classList.add('hidden');
        const response = getResponse(text, state.currentContact);

        if (response) {
            addMessageToChat('received', response.response, state.currentContact);
            saveMessage('received', response.response, state.currentContact);

            if (response.trigger) {
                setTimeout(() => {
                    handleTrigger(response.trigger, response);
                }, 1000);
            }
        }
    }, 1500 + Math.random() * 2000);
}

function getResponse(input, contactId) {
    const contact = characters[contactId];
    if (!contact.responses) return null;

    const lowerInput = input.toLowerCase();

    for (const response of contact.responses) {
        if (response.pattern.test(input)) {
            return response;
        }
    }

    return {
        response: "Maaf? apa yang kau maksud? aku tidak mengerti maksudmu."
    };
}

function handleTrigger(trigger, data) {
    switch (trigger) {
        case 'unlockContacts':

            unlockContact('ryan');
            unlockContact('fiona');
            unlockContact('joshua');
            addClue("Icha terakhir kali terlihat di perpustakaan tua di pusat kota");
            break;

        case 'unlockContact':
            if (data.contactId) {
                unlockContact(data.contactId);
            }
            break;

        case 'addClue':
            if (data.clue) {
                addClue(data.clue);
            }
            break;

        case 'unlockIcha':
            unlockContact('icha');
            break;
    }
}

function unlockContact(contactId) {
    const contact = characters[contactId];
    if (!contact) return;

    if (state.contacts.some(c => c.id === contactId)) return;

    contact.locked = false;
    state.contacts.push(contact);
    renderContacts();

    showNotification(`New contact available: ${contact.name}`);

    saveGame();
}

function addClue(text) {
    if (state.clues.some(clue => clue.text === text)) return;

    state.clues.push({
        text,
        timestamp: new Date().toISOString()
    });

    renderClues();
    showNotification(`Clue baru ditemukan: "${text}"`);

    saveGame();
}

function showClues() {
    renderClues();
    cluesModal.classList.remove('hidden');
}

function hideClues() {
    cluesModal.classList.add('hidden');
}

function renderClues() {
    if (state.clues.length === 0) {
        cluesList.innerHTML = '<div class="text-gray-400 text-center py-8">No clues discovered yet</div>';
        return;
    }

    cluesList.innerHTML = '';
    state.clues.forEach((clue, index) => {
        const clueEl = document.createElement('div');
        clueEl.className = 'bg-gray-700 p-3 rounded-lg';
        clueEl.innerHTML = `
            <div class="flex items-start">
                <div class="bg-yellow-500 text-gray-900 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    ${index + 1}
                </div>
                <div>${clue.text}</div>
            </div>
        `;
        cluesList.appendChild(clueEl);
    });
}

function showNotes() {
    notesModal.classList.remove('hidden');
    notesTextarea.focus();
}

function hideNotes() {
    notesModal.classList.add('hidden');
}

function saveNotes() {
    state.notes = notesTextarea.value;
    saveGame();
    hideNotes();
    showNotification("Notes saved");
}

function showNotification(text) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded shadow-lg animate-fade-in';
    notification.textContent = text;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('animate-fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function saveGame() {
    localStorage.setItem('darkChatGame', JSON.stringify(state));
}

document.addEventListener('DOMContentLoaded', initGame);