import { IMessage } from 'state/chat';
import EditIcon from '@mui/icons-material/EditOutlined';
import FeedbackButtons from 'components/chat/message/feedbackButtons';
import { useSetRecoilState } from 'recoil';
import { playgroundState } from 'state/playground';
import { IconButton, Stack, Tooltip } from '@mui/material';

interface Props {
  message: IMessage;
}

export default function Buttons({ message }: Props) {
  const setPlayground = useSetRecoilState(playgroundState);

  const showEditButton = !!message.prompt && !!message.content;

  const editButton = showEditButton && (
    <Tooltip title="Open in prompt playground">
      <IconButton
        size="small"
        className="playground-button"
        onClick={() => {
          if (!message.prompt) return;
          setPlayground({
            llmSettings: message.llmSettings,
            prompt: message.prompt,
            completion: message.content!
          });
        }}
      >
        <EditIcon sx={{ width: '16px', height: '16px' }} />
      </IconButton>
    </Tooltip>
  );

  const showFeedbackButtons =
    !!message.id &&
    !message.authorIsUser &&
    !message.waitForAnswer &&
    !!message.content;

  if (!showEditButton && !showFeedbackButtons) return null;

  return (
    <Stack direction="row" spacing={1}>
      {editButton}
      {showFeedbackButtons && <FeedbackButtons message={message} />}
    </Stack>
  );
}
