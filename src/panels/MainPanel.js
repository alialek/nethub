import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
  Gallery,
  Div,
  Title,
  Link,
  Text,
} from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";
import {
  MODAL_ABOUT,
  MODAL_INSTRUCTION,
  MODAL_ROOM,
  PAGE_CATEGORY,
} from "../router";
import "./home.css";
import { Icon28HelpCircleOutline } from "@vkontakte/icons";
import thinking from "../img/thinking.png";
import {
  getHome,
  getSearch,
  setActiveRoom,
  setSnackbar,
} from "./../store/data/actions";
import HubCard from "../components/HubCard";
import SearchField from "../components/SearchField";
const Home = ({
  hubCategories,
  getHome,
  getSearch,
  setActiveRoom,
  id,
  home,
  searchCards,
}) => {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const searchRooms = useCallback(
    (text) => {
      setSearch(text);
      if (text.length >= 1) {
        getSearch(text);
        setIsSearchShown(true);
      } else {
        setIsSearchShown(false);
      }
    },
    [setSearch, getSearch, setIsSearchShown],
  );

  useEffect(() => getHome(), [getHome]);

  const openHubCard = (item) => {
    setActiveRoom(item);
    router.pushModal(MODAL_ROOM, { room: item.id });
  };
  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        left={
          <PanelHeaderButton onClick={() => router.pushModal(MODAL_ABOUT)}>
            <Icon28HelpCircleOutline />
          </PanelHeaderButton>
        }
      >
        NetHub
      </PanelHeader>

      <SearchField onShowResult={searchRooms} />
      <Div className="main-content">
        {!isSearchShown && (
          <div>
            {home === null && <PanelSpinner />}
            {home === "error" && (
              <Placeholder
                className="emoji-placeholder"
                icon={<img alt="Error" src={thinking} />}
                header="Oops, error"
              >
                Try to reload page
              </Placeholder>
            )}
            {home?.top && (
              <div className={"category"}>
                <Title className="section-header" level="2" weight="medium">
                  {"⭐ Popular"}
                </Title>
                {home.top.map((item, i) => (
                  <HubCard
                    key={i}
                    description={item.description}
                    onClick={() => openHubCard(item)}
                    logo={item.logo}
                    participants={[item.admins.length, item.members]}
                    admins={item.admins}
                    status={item.status}
                    tags={item.subcategories}
                    title={item.title}
                    category={hubCategories[item.category]}
                    className={`hub-slide`}
                  />
                ))}
              </div>
            )}
            {home?.categories &&
              home?.categories.map((category, i) => (
                <>
                  {!!category.length && (
                    <div key={i} className={"category"}>
                      <div className="d-row justify-space-between align-center">
                        <Title
                          onClick={() =>
                            router.pushPage(PAGE_CATEGORY, { id: i })
                          }
                          style={{ cursor: "pointer" }}
                          className="section-header"
                          level="2"
                          weight="medium"
                        >
                          {hubCategories[i]}
                        </Title>
                        <Text
                          className="category__all-button"
                          onClick={() =>
                            router.pushPage(PAGE_CATEGORY, { id: i })
                          }
                        >
                          Show all
                        </Text>
                      </div>
                      {!category.length ? (
                        <Placeholder
                          className="emoji-placeholder"
                          icon={<p alt="Not found">💬</p>}
                          header="It's quiet here"
                        >
                          It's time to start a conversation.{" "}
                          <Link
                            onClick={() => router.pushModal(MODAL_INSTRUCTION)}
                          >
                            Here is how!
                          </Link>
                        </Placeholder>
                      ) : (
                        <Gallery
                          className={`hub-slider`}
                          slideWidth={category.length === 1 ? "100%" : "90%"}
                        >
                          {category.map((item, i) => (
                            <HubCard
                              key={i}
                              description={item.description}
                              onClick={() => openHubCard(item)}
                              logo={item.logo}
                              participants={[item.admins.length, item.members]}
                              admins={item.admins}
                              tags={item.subcategories}
                              title={item.title}
                              status={item.status}
                            />
                          ))}
                        </Gallery>
                      )}
                    </div>
                  )}
                </>
              ))}
          </div>
        )}
        {isSearchShown && (
          <div>
            <Title className="section-header" level="2" weight="medium">
              {`Поиск по запросу ${search}`}
            </Title>

            {searchCards === null && <PanelSpinner />}
            {searchCards instanceof Array && !search.length && (
              <Placeholder
                icon={
                  <img
                    alt="Заглушка"
                    className="emoji-placeholder"
                    src={thinking}
                  />
                }
                header="Empty"
              >
                Try to search something different
              </Placeholder>
            )}
            {searchCards === "error" && (
              <Placeholder
                icon={
                  <img
                    alt="Заглушка"
                    className="emoji-placeholder"
                    src={thinking}
                  />
                }
                header="Oops, error!"
              >
                Try to reload page
              </Placeholder>
            )}
            {searchCards instanceof Array &&
              !!searchCards.length &&
              searchCards.map((item) => (
                <HubCard
                  key={item.id}
                  description={item.description}
                  onClick={() => openHubCard(item)}
                  logo={item.logo}
                  participants={[item.admins.length, item.members]}
                  admins={item.admins}
                  tags={item.subcategories}
                  category={hubCategories[item.category]}
                  title={item.title}
                  status={item.status}
                />
              ))}
          </div>
        )}
      </Div>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    hubCategories: state.data.hubCategories,
    home: state.data.home,
    searchCards: state.data.search,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      { getHome, getSearch, setActiveRoom, setSnackbar },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
