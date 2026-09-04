'use client';

import React, { useState } from 'react';
import { ExternalLink, FileText, Home } from 'lucide-react';

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  fileName: string;
  order: number;
}

const questionnaires: Questionnaire[] = [
  {
    id: 'index',
    title: 'Index - Owner Questionnaires',
    description: 'Home page for the questionnaire suite. Start here for an overview of all questionnaires.',
    fileName: 'Index - Owner Questionnaires.dc.html',
    order: 0,
  },
  {
    id: 'operating-model',
    title: '01 Operating Model and Public Boundaries',
    description: 'Define your business model, operating hours, and public-facing policies.',
    fileName: '01 Operating Model and Public Boundaries.dc.html',
    order: 1,
  },
  {
    id: 'inventory-intake',
    title: '02 Inventory SKU and Photo Intake',
    description: 'Manage inventory tracking, SKU systems, and product photography workflows.',
    fileName: '02 Inventory SKU and Photo Intake.dc.html',
    order: 2,
  },
  {
    id: 'listing-workflow',
    title: '03 Listing Website and Status Workflow',
    description: 'Control how products are listed on your website and manage status workflows.',
    fileName: '03 Listing Website and Status Workflow.dc.html',
    order: 3,
  },
  {
    id: 'ai-handoff',
    title: '04 AI Permissions and Working Handoff',
    description: 'Set up AI permissions, workflows, and handoff procedures.',
    fileName: '04 AI Permissions and Working Handoff.dc.html',
    order: 4,
  },
];

export default function QuestionnairesClient() {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(
    questionnaires[0]
  );

  const handleOpenQuestionnaire = (questionnaire: Questionnaire) => {
    const filePath = `/questionnaires/${encodeURIComponent(questionnaire.fileName)}`;
    window.open(filePath, '_blank');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
          Owner Operations Questionnaire Suite
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--charcoal, #2D2D2D)', opacity: 0.7 }}>
          Complete questionnaires to define your operations, inventory systems, listing workflows, and AI integration handoff.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        {/* Left Sidebar - Questionnaire List */}
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', color: 'var(--charcoal, #2D2D2D)', opacity: 0.6 }}>
            Questionnaires
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {questionnaires.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelectedQuestionnaire(q)}
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  border: selectedQuestionnaire?.id === q.id ? '2px solid var(--tok-primary, #F5C842)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '6px',
                  background: selectedQuestionnaire?.id === q.id ? 'rgba(245, 200, 66, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: selectedQuestionnaire?.id === q.id ? 600 : 500,
                  color: 'var(--charcoal, #2D2D2D)',
                  transition: 'all 200ms',
                }}
                onMouseOver={(e) => {
                  if (selectedQuestionnaire?.id !== q.id) {
                    (e.target as HTMLButtonElement).style.background = 'rgba(0,0,0,0.03)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedQuestionnaire?.id !== q.id) {
                    (e.target as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {q.order === 0 ? <Home size={14} /> : <FileText size={14} />}
                  <span>{q.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div>
          {selectedQuestionnaire && (
            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                      {selectedQuestionnaire.title}
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--charcoal, #2D2D2D)', opacity: 0.7 }}>
                      {selectedQuestionnaire.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenQuestionnaire(selectedQuestionnaire)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: 'var(--tok-primary, #F5C842)',
                      color: '#1E1E1E',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <ExternalLink size={14} />
                    Open Document
                  </button>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '4px', fontSize: '12px', color: 'var(--charcoal, #2D2D2D)', opacity: 0.7 }}>
                <p style={{ marginBottom: '8px', fontWeight: 600 }}>💡 How to Use</p>
                <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
                  {selectedQuestionnaire.order === 0 ? (
                    <>
                      <li>Select each questionnaire from the list on the left</li>
                      <li>Click "Open Document" to view the full questionnaire in a new window</li>
                      <li>Answer questions to set up your operations</li>
                      <li>Complete all 4 questionnaires for a full operations setup</li>
                    </>
                  ) : (
                    <>
                      <li>This questionnaire guides you through critical operational decisions</li>
                      <li>Answer each question thoroughly—this becomes your operational source of truth</li>
                      <li>Save your responses for future reference</li>
                      <li>You can return and update answers anytime</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'space-between' }}>
                <button
                  onClick={() => {
                    const prevIndex = questionnaires.findIndex(q => q.id === selectedQuestionnaire.id) - 1;
                    if (prevIndex >= 0) {
                      setSelectedQuestionnaire(questionnaires[prevIndex]);
                    }
                  }}
                  disabled={selectedQuestionnaire.order === 0}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: selectedQuestionnaire.order === 0 ? '#e5e5e5' : 'transparent',
                    color: selectedQuestionnaire.order === 0 ? '#999' : 'var(--charcoal, #2D2D2D)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                    cursor: selectedQuestionnaire.order === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  ← Previous
                </button>

                <div style={{ fontSize: '12px', color: 'var(--charcoal, #2D2D2D)', opacity: 0.6, display: 'flex', alignItems: 'center' }}>
                  {selectedQuestionnaire.order + 1} of {questionnaires.length}
                </div>

                <button
                  onClick={() => {
                    const nextIndex = questionnaires.findIndex(q => q.id === selectedQuestionnaire.id) + 1;
                    if (nextIndex < questionnaires.length) {
                      setSelectedQuestionnaire(questionnaires[nextIndex]);
                    }
                  }}
                  disabled={selectedQuestionnaire.order === questionnaires.length - 1}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: selectedQuestionnaire.order === questionnaires.length - 1 ? '#e5e5e5' : 'var(--tok-primary, #F5C842)',
                    color: selectedQuestionnaire.order === questionnaires.length - 1 ? '#999' : '#1E1E1E',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: selectedQuestionnaire.order === questionnaires.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Start Info */}
      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          background: '#ffffff',
          border: '1px solid var(--tok-primary, #F5C842)',
          borderRadius: '6px',
          fontSize: '13px',
          color: 'var(--charcoal, #2D2D2D)',
        }}
      >
        <p style={{ marginBottom: '12px' }}>
          <strong>Getting Started:</strong> Start with the Index questionnaire, then work through Operating Model, Inventory, Listing Workflow, and AI Handoff in order. Your responses create your operational playbook.
        </p>
        <p>
          <strong>Questions?</strong> Email{' '}
          <a href="mailto:contact@digitalallies.net" style={{ color: 'var(--tok-primary, #F5C842)', textDecoration: 'underline', fontWeight: 600 }}>
            contact@digitalallies.net
          </a>
        </p>
      </div>
    </div>
  );
}
