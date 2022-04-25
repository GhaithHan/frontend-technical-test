import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react'
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { ClickAwayListener, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { swrFetcher } from '../api/swrFetcher';


const messageClass = "w-[fit-content] p-4 rounded-lg m-2 pb-8 relative text-right min-w-20"
const deletebBtnClass = 'bg-red-500 absolute p-2 text-[#fff] rounded-lg border-1 border-solid border-gray-500 backdrop-opacity-70'

interface MessageProps {
  authorId: number,
  body: string,
  messageId: number,
  conversationId: number,
  timestamp: number
}

const Message = ({authorId, body, messageId, conversationId, timestamp}: MessageProps) => {
  
  const loggedUser = getLoggedUserId();
  const currentAuthor = loggedUser === authorId;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [deleteOption, setDeleteOption] = useState(false);
  const handleClickAway = () => {
    setDeleteOption(false);
    setOptionsVisible(false);
  };

  const deleteMessage = async () => {
    swrFetcher.deleteMessage(messageId)
  };


  return (
    <div>
      <p className={classNames(
        messageClass,
        currentAuthor ? 'ml-auto bg-[#dcf8c6]' : 'text-left bg-white'
      )}
          onMouseLeave={() => setOptionsVisible(false)}
          onMouseEnter={() => setOptionsVisible(true)}
      >
        {body}
        <span className="text-gray-600 p-2 text-[9px] absolute bottom-0 text-right right-0">
          {timestamp ? moment(timestamp).format('LT') : '...'}
        </span>
        {optionsVisible && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <IconButton
                  onClick={() => {
                    setDeleteOption(!deleteOption);
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </ClickAwayListener>
            )}
            {deleteOption && (
              <span
                className={classNames(
                  deletebBtnClass,
                  currentAuthor ?  'left-[-100px]': 'right-[-100px]'
                )}
                onClick={deleteMessage}
              >
                Delete
              </span>
            )}
      </p> 
    </div>
  )
}

export default Message
