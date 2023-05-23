import React from 'react';
import EditorPage from './editorpage/editorPage';
import {Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
     <Routes>
     <Route path="/projects/:projectId/edit" component={EditorPage} />
       </Routes> 
    
    </div>
  );
}

export default App;
