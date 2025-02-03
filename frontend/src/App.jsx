import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Articles from './pages/Articles'
import Github from './pages/Github'
import Settings from './pages/Settings'
import ProjectDetail from './pages/ProjectDetail'
import SingleArticlePage from './pages/ArticleDetail'
import Certifications from './pages/Certifications'


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                    <Route path="/articles" element={<Articles/>}/>
                    <Route path="/articles/:id" element={<SingleArticlePage/>}/>

                    <Route path="/github" element={<Github/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/projects/:projectName" element={<ProjectDetail/>}/>
                    <Route path="/certifications" element={<Certifications/>}/>


                </Routes>
            </Layout>
        </Router>
    )
}

export default App

