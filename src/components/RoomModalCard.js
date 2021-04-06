import React, { useState, useEffect } from "react";
import {
  useParams,
  useRouter,
  withParams,
  withRouter,
} from "@happysanta/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Chip,
  Input,
  ModalCard,
  PanelSpinner,
  Avatar,
  Group,
  Header,
  Caption,
  Text,
} from "@vkontakte/vkui";
import {
  Icon24Copy,
  Icon20CheckCircleFillGreen,
  Icon28UsersCircleFillGray,
} from "@vkontakte/icons";
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";
import showSnackbar from "../services/generateSnackbar";
import {
  getActiveRoom,
  setActiveRoom,
  setSnackbar,
} from "../store/data/actions";
import RoomStatus from "./RoomStatus";
import { ReactComponent as TelegramLogo } from "../img/tg_icon.svg";

const AboutCard = ({
  setActiveRoom,
  id,
  hubCategories,
  getActiveRoom,
  setSnackbar,
  activeRoom,
}) => {
  const router = useRouter();
  const params = useParams();

  const onClose = () => {
    setActiveRoom(null);
    router.replaceModal(null);
  };

  const onCopy = () => {
    setSnackbar(
      showSnackbar(<Icon20CheckCircleFillGreen />, "Copied!", () =>
        setSnackbar(null),
      ),
    );
  };
  useEffect(() => {
    if (params.room) {
      getActiveRoom(params.room);
    }
  }, [getActiveRoom, params]);

  return activeRoom && activeRoom !== "error" ? (
    <ModalCard
      id={id}
      actionsLayout={"vertical"}
      icon={
        activeRoom.logo ? (
          <Avatar src={activeRoom.logo} size={70} />
        ) : activeRoom.id ? (
          <Icon28UsersCircleFillGray width={70} height={70} />
        ) : (
          ""
        )
      }
      subheader={
        activeRoom.id && (
          <div className="d-row justify-center align-center">
            <RoomStatus status={activeRoom.status} />
            {Number.isInteger(activeRoom.category_id) && (
              <Chip style={{ marginLeft: 24 }} removable={false}>
                {hubCategories[activeRoom.category_id]}
              </Chip>
            )}
          </div>
        )
      }
      onClose={onClose}
      header={activeRoom?.title ?? null}
      actions={
        activeRoom.id
          ? [
              <a
                key={activeRoom.inviteLink}
                href={activeRoom.inviteLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  size="l"
                  before={<TelegramLogo style={{ width: 20 }} />}
                  stretched
                  mode={"primary"}
                >
                  Join room
                </Button>
              </a>,
            ]
          : []
      }
    >
      {activeRoom === null && <PanelSpinner />}
      {!activeRoom.id && (
        <Text>This room is finished or you misspelled the identificator</Text>
      )}
      {activeRoom.id && (
        <div>
          <div>
            {activeRoom.status !== "online" && (
              <Group>
                <Header mode="secondary">Starting at</Header>
                {new Date(activeRoom.date).toLocaleString("en", {
                  hour: "numeric",
                  minute: "numeric",
                  day: "numeric",
                  month: "long",
                })}
              </Group>
            )}
            <Group>
              <Header mode="secondary">Participants</Header>
              <div style={{ marginTop: 4 }}>{activeRoom.members} listeners</div>
            </Group>
            {!!activeRoom.description && (
              <Group>
                <Header mode="secondary">Description</Header>
                <div>{activeRoom.description}</div>
              </Group>
            )}
            {!!activeRoom.subcategories.length && (
              <Group>
                <Header mode="secondary">Tags</Header>
                <div>
                  {activeRoom.subcategories.map((label, i) => (
                    <Chip
                      style={{ marginRight: 12, marginTop: 4 }}
                      removable={false}
                      key={i}
                    >
                      {label}
                    </Chip>
                  ))}
                </div>
              </Group>
            )}
            <div style={{ marginTop: 16 }} className={"d-row align-center"}>
              <Input
                style={{ flexGrow: 2 }}
                disabled
                type="text"
                value={activeRoom.inviteLink.split("https://")[1]}
              />
              <CopyToClipboard
                onCopy={onCopy}
                text={activeRoom.inviteLink.split("https://")[1]}
              >
                <Icon24Copy style={{ marginLeft: 8, cursor: "pointer" }} />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )}
    </ModalCard>
  ) : (
    <ModalCard id={id}>
      <PanelSpinner />
    </ModalCard>
  );
};

const mapStateToProps = (state) => {
  return {
    activeRoom: state.data.activeRoom,
    hubCategories: state.data.hubCategories,
    snackbar: state.data.snackbar,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      { setSnackbar, setActiveRoom, getActiveRoom },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withParams(withRouter(AboutCard)));
