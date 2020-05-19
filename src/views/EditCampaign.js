import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Card, Avatar, Collapse } from "antd";

import { Button } from "../Component";
import { EditAndDelete } from "../Containers";
import { AddPlayerForm, AddNPCForm} from "../Templates";

import { campaignList, playersList, sessionList, npcs } from '../mock'
import { useDispatch } from "react-redux";
import savePlayerInfo from "../redux/actions/save_playerInfo";

const { Panel } = Collapse;

const PlayerItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 width: 100%;
 padding: 1rem;
`;

const PlayerInfo = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
 word-break: break-all;
`;
const PlayerInfoTitle = styled.span`
 font-weight: bold;
`;

const CampaignSection = styled.section`
 margin: 1rem 0;
 padding: 1rem 0;
 border-bottom: 1px solid #c7c7c7;
`;

const SessionItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 font-size: 14px;
 padding: 1rem 0.5rem;
`;

const AvatarWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 cursor: pointer;
`;

const SessionsListItem = ({ title, onClick, onDelete }) => (
 <SessionItem>
  <span>{title}</span>
  <EditAndDelete onEdit={onClick} onDelete={onDelete}/>
 </SessionItem>
);

const PlayersListItem = ({
 name,
 character,
 avatar,
 classType,
 raceType,
 level,
 onClick
}) => (
 <PlayerItem>
  <AvatarWrapper onClick={onClick}>
   <Avatar src={avatar} size="large" style={{ marginRight: "1rem" }} />
   <PlayerInfo>
    <PlayerInfoTitle>Personagem:</PlayerInfoTitle>
    <span>{character}</span>
   </PlayerInfo>
  </AvatarWrapper>
  <PlayerInfo>
   <PlayerInfoTitle>Jogador:</PlayerInfoTitle>
   <span>{name}</span>
  </PlayerInfo>
  <PlayerInfo>
   <PlayerInfoTitle>Raça:</PlayerInfoTitle>
   <span>{raceType}</span>
  </PlayerInfo>
  <PlayerInfo>
   <PlayerInfoTitle>Classe:</PlayerInfoTitle>
   <span>{classType}</span>
  </PlayerInfo>
  <PlayerInfo>
   <PlayerInfoTitle>Nível:</PlayerInfoTitle>
   <span>{level}</span>
  </PlayerInfo>
 </PlayerItem>
);

const NPCListItem = ({
 age,
 raceType,
 alignment,
 ideal,
 bond,
 flaws,
 onClick,
 onDelete,
}) => (
 <>
  <PlayerItem>
   <PlayerInfo>
    <PlayerInfoTitle>Idade:</PlayerInfoTitle>
    <span>{age}</span>
   </PlayerInfo>
   <PlayerInfo>
    <PlayerInfoTitle>Raça:</PlayerInfoTitle>
    <span>{raceType}</span>
   </PlayerInfo>
   <PlayerInfo>
    <PlayerInfoTitle>Alinhamento:</PlayerInfoTitle>
    <span>{alignment}</span>
   </PlayerInfo>
   <PlayerInfo>
    <PlayerInfoTitle>Ideais:</PlayerInfoTitle>
    <span>{ideal}</span>
   </PlayerInfo>
   <PlayerInfo>
    <PlayerInfoTitle>Laços:</PlayerInfoTitle>
    <span>{bond}</span>
   </PlayerInfo>
   <PlayerInfo>
    <PlayerInfoTitle>Falhas:</PlayerInfoTitle>
    <span>{flaws}</span>
   </PlayerInfo>
   <EditAndDelete onEdit={onClick} onDelete={onDelete}/>
  </PlayerItem>
 </>
);

const EditCampaign = () => {
 const [campaign, setCampaign] = useState("");
 const [players, setPlayers] = useState(playersList);
 const [addPlayerFormVisible, setPlayerFormVisible] = useState(false);
 const [addNPCFormVisible, setNPCFormVisible] = useState(false);
 const [npcList, setNPCs] = useState(npcs);
 const { id } = useParams();
 const history = useHistory();
 const dispatch = useDispatch()

 useEffect(() => {
  const filteredCampaign = campaignList.filter(
   (session) => session.url === `/campaigns/${id}`
  );
  setCampaign(filteredCampaign[0]);
 }, [id]);

 const OpenAddPlayerForm = () => {
  setPlayerFormVisible(true);
 };

 const redirectToPlayerSheet = (playerInfo) => {
   const {
    character, 
    name,
    classType,
    raceType,
    level
   } = playerInfo
  dispatch(savePlayerInfo({
    characterName: character,
    playerName: name,
    classType,
    raceType,
    level,
  }))
  history.push("/teste")
 }

 const AddPlayer = ({
  avatar,
  name,
  character,
  classType,
  raceType,
  level,
  email,
 }) => {
  const newPlayer = {
   id,
   avatar,
   name,
   character,
   classType,
   raceType,
   level,
   email,
  };

  const newPlayers = [...players, newPlayer];
  setPlayers(newPlayers);
  setPlayerFormVisible(false);
 };

 const AddNPC = ({
  id,
  name,
  age,
  raceType,
  alignment,
  ideal,
  bond,
  flaw,
  background,
  affiliation,
  items,
 }) => {
  const newNPC = {
   id,
   name,
   age,
   raceType,
   alignment,
   ideal,
   bond,
   flaw,
   background,
   affiliation,
   items,
  };

  const newNPCs = [...npcList, newNPC];
  setNPCs(newNPCs);
  setNPCFormVisible(false);
 };

 const DeletePlayer = (id) => {
  const filteredPlayers = players.filter((player) => player.id !== id);
  setPlayers(filteredPlayers);
  setPlayerFormVisible(false);
 };
 
 const DeleteNPC = (id) => {
  const filteredNPC = npcList.filter((npc) => npc.id !== id);
  setNPCs(filteredNPC);
 };

 const { title, system } = campaign || {
  title: "Não existe",
  system: "Não tem",
 };
 return (
  <Card title={title} bordered={false} style={{ width: "100%" }}>
   <CampaignSection>
    <h1>SISTEMA</h1>
    <span>{system}</span>
   </CampaignSection>
   <CampaignSection>
    <h1>
     <span>JOGADORES</span>
     <Button
      backgroundColor= "#b21f66"
      textColor="white"
      onClick={OpenAddPlayerForm}
      >
        Adicionar
      </Button>
     <AddPlayerForm
      visible={addPlayerFormVisible}
      onClose={() => setPlayerFormVisible(false)}
      onSubmit={AddPlayer}
      onDelete={DeletePlayer}
     />
    </h1>
    {players.map(
     ({ avatar, name, character, classType, raceType, level }, index) => (
      <PlayersListItem
       key={index}
       avatar={avatar}
       name={name}
       character={character}
       classType={classType}
       raceType={raceType}
       level={level}
       onClick={() => redirectToPlayerSheet({
        character, 
        name,
        classType,
        raceType,
        level
       })}
      />
     )
    )}
   </CampaignSection>
   <CampaignSection>
    <h1>
     <span>SESSÕES</span>
     <Button 
      backgroundColor= "#b21f66"
      textColor="white"
      onClick={() => history.push("/sessions/newSession")}>
      Adicionar
     </Button>
    </h1>
    <Collapse accordion bordered={false}>
     {sessionList.map(({ title, description, id }) => (
      <Panel key={id} header={title}>
       <SessionsListItem
        title={`${description} da sessão ${title}`}
        onClick={() => console.log("oi")}
        onDelete={() => console.log("oi")}
       />
      </Panel>
     ))}
    </Collapse>
   </CampaignSection>
   <CampaignSection>
    <h1>
     <span>NPCs</span>
     <Button 
      backgroundColor= "#b21f66"
      textColor="white"
      onClick={() => setNPCFormVisible(true)}>
      Adicionar
     </Button>
     <AddNPCForm
      visible={addNPCFormVisible}
      onClose={() => setNPCFormVisible(false)}
      onSubmit={AddNPC}
      onDelete={DeleteNPC}
     />
    </h1>
    <Collapse accordion bordered={false}>
     {npcList.map(
      ({ id, name, age, raceType, alignment, ideal, bond, flaw }) => (
       <Panel key={id} header={name}>
        <NPCListItem
         age={age}
         alignment={alignment}
         raceType={raceType}
         ideal={ideal}
         bond={bond}
         flaws={flaw}
         onClick={() => console.log()}
         onDelete={() => DeleteNPC(id)}
        />
       </Panel>
      )
     )}
    </Collapse>
   </CampaignSection>
  </Card>
 );
};

export default EditCampaign;
