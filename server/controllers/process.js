const {
  DoistCard,
  TextBlock,
  SubmitAction,
  OpenUrlAction,
} = require('@doist/ui-extensions-core');
const processHabitContextMenu = async (req, res) => {
  const doistRequest = req.body;
  const { action } = doistRequest;

  if (action.actionType === 'initial') {
    const card = new DoistCard();
    card.addItem(
      TextBlock.from({
        text: 'Hello, my friend!',
      })
    );
    card.addAction(
      SubmitAction.from({
        id: 'Action.Submit',
        title: 'Add Q to task',
        style: 'positive',
      })
    );

    res.status(200).json({ card: card });
  } else if (
    action.actionType === 'submit' &&
    action.actionId === 'Action.Submit'
  ) {
    const card = new DoistCard();
    card.addItem(
      TextBlock.from({
        text: 'Hello, my friend!',
      })
    );
    const randomNumber = Math.floor(Math.random() * 1000);
    card.addAction(
      OpenUrlAction.from({
        id: 'Action.OpenUrl',
        url: `https://todoist.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=data:read_write&state=${randomNumber}`,
      })
    );
    res.status(200).json({ card: card });
  }
};

module.exports = {
  processHabitContextMenu,
};
