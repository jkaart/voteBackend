import { VoteCard } from "../classes/VoteCard.js";
import { mainContentDiv, voteContainer, errorDiv } from "../htmlElements/htmlElements.js";

const votesMap = new Map();

const updateVoteCounts = async (data) => {
    return new Promise((resolve, reject) => {
        const voteCard = votesMap.get(data.id);
        voteCard.updateCounts(data);
        voteCard.updateAll();
        resolve(data.message);
    });
};

const addNewVoteCardsToMap = (arrayOfVoteData) => {
    let addedVotesCount = 0;
    let updatedVotesCount = 0;
    // Add new votes to the votesMap
    arrayOfVoteData.forEach(data => {
        let voteCard;
        if (!votesMap.has(data.id)) {
            if (votesMap.size === 0) {
                mainContentDiv.innerHTML = '';
                mainContentDiv.appendChild(voteContainer);
            }
            voteCard = new VoteCard(data.id, data.title, data.description, data.options, data.voteCreated);
            votesMap.set(data.id, voteCard);
            voteContainer.appendChild(voteCard.card);

            addedVotesCount += 1;
        }
        else {
            voteCard = votesMap.get(data.id);
            voteCard.voteData = { title: data.title, description: data.description, options: data.options, votedUsers: data.votedUsers };
            //voteCard.updateAll();
            updatedVotesCount += 1;
        }
        voteCard.updateAll();
    });

    console.log('Added votes count: ', addedVotesCount);
    console.log('Updated votes count: ', updatedVotesCount);
};

const removeVoteFromMap = (voteId) => {
    const voteCard = votesMap.get(voteId);
    voteCard.card.remove();
    const result = votesMap.delete(voteId);
    showNoVotesText();
    return result;
};

const showNoVotesText = () => {
    if (votesMap.size === 0) {
        mainContentDiv.innerHTML = '';
        mainContentDiv.appendChild(errorDiv);
    }
};

const deleteOldCardsFromMap = (newVoteIds) => {
    let deletedVotesCount = 0;
    // Remove old votes from votesMap
    for (const id of votesMap.keys()) {
        if (!newVoteIds.has(id)) {
            removeVoteFromMap(id);
            deletedVotesCount += 1;
        }
    }
    console.log('Deleted votes count: ', deletedVotesCount);
};


const generateVoteCardMap = async (arrayOfVoteData) => {
    const votesMapSize = votesMap.size;

    // Get new votes IDs from array
    const newVoteIds = new Set(arrayOfVoteData.map(data => data.id));

    addNewVoteCardsToMap(arrayOfVoteData);
    deleteOldCardsFromMap(newVoteIds);

    console.log('Response votes count: ', newVoteIds.size);
    console.log('Old votes count: ', votesMapSize);
};

export { generateVoteCardMap, updateVoteCounts, addNewVoteCardsToMap, removeVoteFromMap, showNoVotesText };