import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
  Div,
  Search,
  Title,
  Link,
  SubnavigationBar,
  SubnavigationButton,
} from "@vkontakte/vkui";
import { useParams, useRouter } from "@happysanta/router";
import { MODAL_ABOUT, MODAL_INSTRUCTION, MODAL_ROOM } from "../router";
import "./home.css";
import { Icon28HelpCircleOutline } from "@vkontakte/icons";
import thinking from "../img/thinking.png";
import { getSearch, setActiveRoom, setSnackbar } from "../store/data/actions";
import HubCard from "../components/HubCard";
import { getCategory } from "./../store/data/actions";
import { PAGE_MAIN } from "./../router/index";
import SearchField from "./../components/SearchField";
const CategoryPanel = ({
  category,
  setActiveRoom,
  id,
  getCategory,
  hubCategories,
}) => {
  const router = useRouter();
  const params = useParams();
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(null);
  const [isAll, setIsAll] = useState(true);

  const filterRooms = ({ isAll, text }) => {
    if (typeof text === "string") setSearch(text);
    if (typeof isAll === "boolean") setIsAll(isAll);
  };
  const setSearchFilter = (text) => {
    filterRooms({ text });
  };

  useEffect(() => {
    if (!!search.length || !isAll) {
      setIsSearchShown(true);
      return setFilteredRooms(() => {
        return category.filter((item) => {
          if (!isAll) {
            return (
              item.status === "online" &&
              item.title.toLowerCase().includes(search.toLowerCase()) &&
              item
            );
          }
          return (
            item.title.toLowerCase().includes(search.toLowerCase()) && item
          );
        });
      });
    }
    return setIsSearchShown(false);
  }, [search, isAll]);

  const openHubCard = (item) => {
    setActiveRoom(item);
    router.pushModal(MODAL_ROOM, { room: item.id });
  };

  useEffect(() => {
    const fetchRooms = async () => await getCategory(params.id);
    fetchRooms();
  }, [params, getCategory]);

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
        <span
          onClick={() => router.pushPage(PAGE_MAIN)}
          className="PanelHeader__content-in"
          style={{ cursor: "pointer" }}
        >
          NetHub / {hubCategories[params.id]}
        </span>
      </PanelHeader>

      <SearchField onShowResult={setSearchFilter} />
      <SubnavigationBar>
        <SubnavigationButton
          selected={isAll}
          onClick={() => filterRooms({ isAll: true })}
        >
          All
        </SubnavigationButton>
        <SubnavigationButton
          selected={!isAll}
          onClick={() => filterRooms({ isAll: false })}
        >
          Live
        </SubnavigationButton>
      </SubnavigationBar>
      <Div className="main-content">
        {!isSearchShown && (
          <div>
            {category === null && <PanelSpinner />}
            {category === "error" && (
              <Placeholder
                className="emoji-placeholder"
                icon={<img alt="Error" src={thinking} />}
                header="Oops, error"
              >
                Try to reload page
              </Placeholder>
            )}
            {category instanceof Array && !category.length && (
              <Placeholder
                className="emoji-placeholder"
                icon={<p alt="Not found">💬</p>}
                header="It's quiet here"
              >
                It's time to start a conversation.{" "}
                <Link onClick={() => router.pushModal(MODAL_INSTRUCTION)}>
                  Here is how!
                </Link>
              </Placeholder>
            )}
            {category instanceof Array &&
              !!category.length &&
              category.map((item, i) => (
                <HubCard
                  key={i}
                  onClick={() => openHubCard(item)}
                  logo={item.logo}
                  participants={[item.admins.length, item.members]}
                  admins={item.admins}
                  tags={item.subcategories}
                  description={item.description}
                  title={item.title}
                  status={item.status}
                  className={`hub-slide`}
                />
              ))}
          </div>
        )}
        {isSearchShown && (
          <div>
            {filteredRooms === null && <PanelSpinner />}
            {filteredRooms instanceof Array && !filteredRooms.length && (
              <Placeholder
                className="emoji-placeholder"
                icon={<p alt="Not found">💬</p>}
                header="Empty"
              >
                You can create the first live chat here!
              </Placeholder>
            )}
            {filteredRooms === "error" && (
              <Placeholder
                icon={
                  <img
                    alt="Заглушка"
                    className="emoji-placeholder"
                    src={thinking}
                  />
                }
                header="Error"
              >
                Oops, try to reload
              </Placeholder>
            )}
            {filteredRooms instanceof Array &&
              !!filteredRooms.length &&
              filteredRooms.map((item) => (
                <HubCard
                  key={item.id}
                  description={item.description}
                  onClick={() => openHubCard(item)}
                  logo={item.logo}
                  description={item.description}
                  participants={[item.admins.length, item.members]}
                  admins={item.admins}
                  tags={item.subcategories}
                  status={item.status}
                  category={hubCategories[item.category]}
                  title={item.title}
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
    category: state.data.category,
    searchCards: state.data.search,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      { getSearch, setActiveRoom, setSnackbar, getCategory },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPanel);
