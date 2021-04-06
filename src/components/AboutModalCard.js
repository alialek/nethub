import React, { Component } from "react";
import { useRouter } from "@happysanta/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Chip,
  Link,
  ModalCard,
  Subhead,
  Text,
  Title,
} from "@vkontakte/vkui";
import { MODAL_INSTRUCTION } from "../router";

const AboutCard = ({ id }) => {
  const router = useRouter();
  return (
    <ModalCard
      actionsLayout={"vertical"}
      id={id}
      onClose={router.popPage}
      header="About NetHub"
      actions={[
        <Button onClick={router.popPage} size="l" stretched mode={"secondary"}>
          Close
        </Button>,
      ]}
    >
      <Text style={{ marginTop: 8, opacity: 0.7 }}>
        NetHub is a catalog of open voice chats on Telegram. Create interactive
        podcasts, meet new people and share stories with them. <br />
        <br />
      </Text>
      <Title weight="semibold">How to add a channel?</Title>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>
        {" "}
        Just start our bot
        <Link href="https://t.me/nethub_bot" target="_blank">
          <Chip removable={false}>@nethub_bot</Chip>
        </Link>{" "}
        and follow the instructions.
      </Text>
    </ModalCard>
  );
};

const mapStateToProps = (state) => {
  return {
    snackbar: state.data.snackbar,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutCard);
