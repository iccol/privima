const BotProxy = require('./bot-proxy');
const EngagementManager = require('./engagementManager');
const { managerModes } = require('./constants');

const token = '5704914017:AAFhaa2TyueRkLOxEa3i22Las00CXP1lxyA';
const groupChatId = '1307988736';
const groupChatId = '';

const botProxy = new BotProxy(token, groupChatId, true);

const engagementManager = new EngagementManager(
    (text) => botProxy.sendMessageToGroup(text), //send to group
    (text) => botProxy.sendMessageToGroup(text, true), //send to group as HTML
    true //debug mode
);

botProxy.subscribeOnEvent('message', (msg) => {
    if (engagementManager.currentMode === managerModes.COLLECTING && msg.text.startsWith('@')) {
        let text = msg.text.split(' ')[0];
        engagementManager.addCandidate(text);
    }
})

botProxy.onText(/\/chatId/, (msg) => {
    const chatId = msg.chat.id;
    botProxy.sendMessage(chatId, 'chatId: ' + chatId);
})

engagementManager.start();
