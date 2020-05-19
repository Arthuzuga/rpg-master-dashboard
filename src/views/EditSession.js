import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Input, Collapse, Modal } from "antd";
import { sessionList } from "../mock";
import { Button, TitleInfo } from "../Component"
import { 
    AddMusicForm, 
    AddNPCSessionForm, 
    AddChallengeForm, 
    AddDescriptionForm,
    MonstersInfo,
    ChallengeInfo,
    MusicInfo,
    DescriptionInfo
} from "../Templates";

const mockChapter = {
 id: (Math.random() * 1000).toFixed(0),
 text: "",
 playlist: [],
 npcs: [],
 magicItems: [],
 challengers: [],
 monsters: [],
};

const { TextArea } = Input;
const { Panel } = Collapse;
const { confirm } = Modal;

const SessionSection = styled.section`
 padding: 1rem 0;
 border-bottom: 1px solid #c7c7c7;
 display: flex;
 flex-direction: column;
 font-size: 16px;
`;

const SessionInfo = styled.h2`
 font-size: 14px;
`;

const PlayerItem = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 width: 100%;
`;

const PlayerInfo = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 word-break: normal;
 margin: 1rem 0;
 padding: 0.5rem;
 border-bottom: 1px solid #c7c7c7;
`;

const DeleteChapterDiv = styled.div`
 width: 100%;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 padding-top: 1rem;
`;

const EditSession = () => {
 //  const [id, setId] = useState("");
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [chapters, setChapters] = useState([]);
 const [addDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
 const [addMusicModalOpen, setMusicModalOpen] = useState(false);
 const [addNPCModalOpen, setNPCModalOpen] = useState(false);
 const [addMonstersOpen, setMonstersOpen] = useState(false);
 const [addChallengeModalOpen, setChallengeModalOpen] = useState(false);
 //  const [npcs, setNPCs] = useState([]);
//   const [challengers, setChallengers] = useState([]);
 //  const [magicItems, setMagicItems] = useState([]);

 useEffect(() => {
  const chapterList = sessionList[0].chapters;
  setChapters(chapterList);
 }, []);

 const AddChapter = () => {
  const newChapters = [...chapters, mockChapter];
  setChapters(newChapters);
 };

 const setMusics = (songs, index) => {
  const newChapter = {
   ...chapters[index],
   playlist: songs,
  };
  chapters.splice(index, 1);
  const newChapters = [...chapters, newChapter];
  setChapters(newChapters);
 };
 const setChallenges = (challenge, index) => {
  const newChapter = {
   ...chapters[index],
   challenge,
  };
  chapters.splice(index, 1);
  const newChapters = [...chapters, newChapter];
  setChapters(newChapters);
 };
 const setNPCs = (npc, index) => {
  const newChapter = {
   ...chapters[index],
   npcs: npc,
  };
  chapters.splice(index, 1);
  const newChapters = [...chapters, newChapter];
  setChapters(newChapters);
 };

 const setMonsters = (monster, index) => {
  const newChapter = {
   ...chapters[index],
   monsters: monster,
  };
  chapters.splice(index, 1);
  const newChapters = [...chapters, newChapter];
  setChapters(newChapters);
 };

 const setChapterDescription = (newDescription, index) => {
  const newChapter = {
   ...chapters[index],
   description: [...chapters[index].description,newDescription],
  };
  chapters.splice(index, 1);
  const newChapters = [...chapters, newChapter];
  setChapters(newChapters);
 };

 const showDeleteConfirm = (id) =>
  confirm({
   title: "Tem certeza em apagar esse capítulo?",
   okText: "Apagar",
   okType: "danger",
   cancelText: "Cancelar",
   content:
    "Apagando essa sessão não será possível recuperar seus dados depois",
   onOk() {
    DeleteChapter(id);
   },
  });
 const DeleteChapter = (id) => {
  const newChapters = chapters.filter((chapter) => chapter.id !== id);
  setChapters(newChapters);
 };

 return (
  <Card title="Nova sessão" bordered={false} style={{ width: "100%" }}>
   <SessionSection>
    <h1>Informações gerais</h1>
    <div>
     <SessionInfo>Título da Sessão</SessionInfo>
     <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{ width: "48%", marginBottom: "1rem" }}
     />
    </div>
    <div>
     <SessionInfo>Descrição da Sessão</SessionInfo>
     <TextArea
      rows={4}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={{ width: "48%", marginBottom: "1rem" }}
     />
    </div>
   </SessionSection>
   <SessionSection>
    <h1>
     <span>Capítulos</span>
     <Button 
        backgroundColor="#b21f66"
        textColor="white" 
        onClick={() => AddChapter()}>
            Adicionar
        </Button>
    </h1>
    <Collapse accordion bordered={false}>
     {chapters.map(
      (
       { id, description, npcs, playlist, monsters, challengers, magicItems },
       indexChapter
      ) => (
       <Panel key={id} header={`capítulo ${id}`}>
        <PlayerItem>
         <PlayerInfo>
          <TitleInfo>
           <span>Descrição: </span>
           <Button
            backgroundColor="#373737" 
            textColor="white"
            onClick={() => setDescriptionModalOpen(true)}
            >
             Editar
            </Button>
          </TitleInfo>
          <AddDescriptionForm visible={addDescriptionModalOpen} onClose={() => setDescriptionModalOpen(false)} onSubmit={
              (description) => {
                setChapterDescription(description, indexChapter)
                setDescriptionModalOpen(false)
              } 
          }/>
          {
            description.map(({id, text, isSpeak}) => (
                <DescriptionInfo key={id} text={text} isSpeak={isSpeak}/>
            ))
          }
         </PlayerInfo>

         <PlayerInfo>
          <TitleInfo>
           <span>NPCs: </span>
           <Button
            backgroundColor="#373737" 
            textColor="white"
            onClick={() => {
             setNPCModalOpen(true);
            }}
           >
            Editar
           </Button>
           <AddNPCSessionForm
            visible={addNPCModalOpen}
            onClose={() => setNPCModalOpen(false)}
            onSubmit={(npc) => {
             setNPCs(npc, indexChapter);
             setNPCModalOpen(false);
            }}
            npcsDefault={npcs}
           />
          </TitleInfo>
          <div>
           {npcs.length > 0 ? (
            npcs.map(({ id, name }) => (
             <div key={id} style={{ margin: "1rem 0" }}>
              <TitleInfo>Nome:</TitleInfo>
              <span> {name}</span>
             </div>
            ))
           ) : (
            <div style={{ margin: "1rem 0" }}>
             <TitleInfo>Não há NPCs selecionados</TitleInfo>
            </div>
           )}
          </div>
         </PlayerInfo>

         <PlayerInfo>
          <TitleInfo>
           <span>Músicas: </span>
           <Button
            backgroundColor="#373737" 
            textColor="white" 
            onClick={() => setMusicModalOpen(true)}
            >
                Editar
           </Button>
           <AddMusicForm
            visible={addMusicModalOpen}
            onClose={() => setMusicModalOpen(false)}
            onSubmit={(songs) => {
             setMusics(songs, indexChapter);
             setMusicModalOpen(false);
            }}
            musicsDefault={playlist}
           />
          </TitleInfo>
          <div>
           {playlist.length > 0 ? (
            playlist.map(({ id, title, track_id, loop }) => (
             <MusicInfo title={title} trackId={track_id} loop={loop}/>
            ))
           ) : (
            <div style={{ margin: "1rem 0" }}>
             <TitleInfo>Não há músicas selecionadas</TitleInfo>
            </div>
           )}
          </div>
         </PlayerInfo>
         <PlayerInfo>
            <MonstersInfo 
                monsters={monsters}
                indexChapter={indexChapter}
                onEdit={() => setMonstersOpen(true)}
                onModalClose={() => setMonstersOpen(false)}
                isModalOpen={addMonstersOpen}
                onSubmitForm={(e) => {
                    const newMonsters = [...monsters, e];
                    setMonsters(newMonsters, indexChapter);
                    setMonstersOpen(false);
                }}
            />
         </PlayerInfo>
        </PlayerItem>

        <PlayerItem>
         <PlayerInfo>
        <AddChallengeForm 
            visible={addChallengeModalOpen}
            onClose={() => setChallengeModalOpen(false)}
            onSubmit={(challenge) => {
            setChallenges(challenge, indexChapter);
            setChallengeModalOpen(false);
            }}
            challengesDefault={challengers}

        />
          <TitleInfo>
           <span>Desafios: </span>
           <Button
            backgroundColor="#373737" 
            textColor="white" 
            onClick={() => setChallengeModalOpen(true)}>
            Editar
            </Button>
          </TitleInfo>
          <div>
           {challengers.length > 0 ? (
            challengers.map(({ id, title, dc, skill, secret }) => (
            <ChallengeInfo key={id} title={title} dc={dc} skill={skill} secret={secret}/>
            ))
           ) : (
            <div style={{ margin: "1rem 0" }}>
             <TitleInfo>Não há desafios selecionados</TitleInfo>
            </div>
           )}
          </div>
         </PlayerInfo>
        </PlayerItem>

        <PlayerItem>
         <PlayerInfo>
          <TitleInfo>
           <span>Itens Mágicos: </span>
           <Button
            backgroundColor="#373737" 
            textColor="white"
            disable
            >
                Editar
            </Button>
          </TitleInfo>
          <div>
           {magicItems.length > 0 ? (
            magicItems.map(({ id, title }) => (
             <div key={id} style={{ margin: "1rem 0" }}>
              <TitleInfo>Título:</TitleInfo>
              <span> {title}</span>
             </div>
            ))
           ) : (
            <div style={{ margin: "1rem 0" }}>
             <TitleInfo>
              Não há itens mágicos selecionados
             </TitleInfo>
            </div>
           )}
          </div>
         </PlayerInfo>
        </PlayerItem>
        <DeleteChapterDiv>
         <Button
            backgroundColor="#b21f66"
            textColor="white" 
            onClick={() => showDeleteConfirm(id)}>
          Deletar Capítulo
         </Button>
        </DeleteChapterDiv>
       </Panel>
      )
     )}
    </Collapse>
   </SessionSection>
   <DeleteChapterDiv>
    <Button 
    backgroundColor="#b21f66"
    textColor="white"
    onClick={() => console.log("")}
    disable
    >
        Salvar Sessão
    </Button>
   </DeleteChapterDiv>
  </Card>
 );
};

export default EditSession;
