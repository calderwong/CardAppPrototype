import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

// Statically import the raw content of each markdown file
import prdContent from '../ReferenceDocs/CardApp_ProductRequirementDoc.md?raw';
import designContent from '../ReferenceDocs/CardApp_DesignBrief.md?raw';
import researchContent from '../ReferenceDocs/CardApp_research.md?raw';
import journalContent from '../ReferenceDocs/Development_Journal.md?raw';
import backendContent from '../ReferenceDocs/Connecting_to_a_backend.md?raw';


// Define metadata for each document, now including the pre-loaded content
// IMPORTANT: Summaries are placeholders and should be reviewed/updated for accuracy.
const docsMetadata = [
  {
    id: 'prd',
    title: 'Product Requirement Doc',
    summary: 'This document outlines the core requirements, features, user personas, and non-functional specifications for the Credit and Debit Card Management App. It covers aspects like card management, security features, transaction history, budget tracking, and user authentication. It serves as the foundational guide for development.',
    content: prdContent, // Store imported content
  },
  {
    id: 'design',
    title: 'Design Brief',
    summary: 'Provides guidance on the visual identity, user experience (UX) principles, and overall aesthetic for the application. It includes details on color palettes, typography, key screen layouts, and desired brand feel (trustworthy, modern). This brief ensures a consistent and user-friendly design.',
    content: designContent, // Store imported content
  },
  {
    id: 'research',
    title: 'Competitive Research',
    summary: 'Contains analysis of existing card management applications and competitor features. It highlights common functionalities, user priorities (like security and convenience), and potential areas for differentiation. This research informs feature prioritization and design decisions.',
    content: researchContent, // Store imported content
  },
  {
    id: 'journal',
    title: 'Development Journal',
    summary: 'A chronological log detailing the development process. It records user requests verbatim and summarizes the actions taken by the AI assistant (Cascade) to implement those features or address issues. This document tracks progress and provides context for the project evolution.',
    content: journalContent, // Store imported content
  },
  {
    id: 'backend',
    title: 'Connecting to a Backend',
    summary: 'A comprehensive guide detailing all the points where the frontend application would need to connect to backend services. Includes API endpoint specifications, request/response examples, and implementation considerations for authentication, card management, transactions, analytics, rewards, payments, and security features.',
    content: backendContent, // Store imported content
  },
];

function DocumentationPage() {
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [docContent, setDocContent] = useState('');

  // Simplified function to select document and set its content
  const selectDocument = (docId) => {
    const selected = docsMetadata.find(d => d.id === docId);
    if (selected) {
      setSelectedDocId(selected.id);
      setDocContent(selected.content); // Set content directly from metadata
    } else {
      // Handle case where docId might be invalid (though unlikely here)
      setSelectedDocId(null);
      setDocContent('');
    }
  };

  const handleSelectDoc = (doc) => {
    selectDocument(doc.id); // Use the new function
  };

  const handleGoBack = () => {
    setSelectedDocId(null);
    setDocContent('');
  };

  const selectedDoc = selectedDocId ? docsMetadata.find(d => d.id === selectedDocId) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-dark">
        {selectedDoc ? selectedDoc.title : 'Prototype Reference Documentation'}
      </h1>

      {selectedDocId ? (
        // View Single Document
        <div>
          <button
            onClick={handleGoBack}
            className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to List
          </button>

          {docContent && (
            <div className="prose prose-lg max-w-none bg-white p-6 rounded-lg shadow-md">
              {/* prose classes style the markdown nicely */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{docContent}</ReactMarkdown>
            </div>
          )}
        </div>
      ) : (
        // View Document List
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docsMetadata.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">{doc.title}</h2>
                <p className="text-neutral-darker text-sm mb-4">{doc.summary}</p>
              </div>
              <button
                onClick={() => handleSelectDoc(doc)}
                className="mt-auto self-start px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentationPage;
