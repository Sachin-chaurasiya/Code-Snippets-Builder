import React from 'react';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import AddMediaModal from '../../components/AddMediaModal/AddMediaModal';

const Home = () => {
  return (
    <>
      <AddMediaModal />
      <CodeEditor />;
    </>
  );
};

export default Home;
