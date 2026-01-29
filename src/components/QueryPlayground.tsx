import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nlQueryResponses } from '../data/quests';
import { useAppStore } from '../store/appStore';
import { Search, Sparkles, X } from 'lucide-react';

export function QueryPlayground() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    setHighlightedEntities, 
    setHighlightedRelationships, 
    clearHighlights,
    activeQuest,
    currentStepIndex,
    advanceQuestStep
  } = useAppStore();

  const handleQuery = useCallback(() => {
    if (!input.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const normalizedInput = input.toLowerCase().trim();
      
      // Find matching response
      const matchedResponse = nlQueryResponses.find(response => {
        const queryMatch = response.query.toLowerCase() === normalizedInput;
        const partialMatch = response.matches.some(match => 
          normalizedInput.includes(match.toLowerCase())
        );
        return queryMatch || partialMatch;
      });

      if (matchedResponse) {
        setResult(matchedResponse.result);
        setHighlightedEntities(matchedResponse.highlightEntities);
        setHighlightedRelationships(matchedResponse.highlightRelationships);
        
        // Check if this advances a quest step
        if (activeQuest) {
          const currentStep = activeQuest.steps[currentStepIndex];
          if (currentStep.targetType === 'query') {
            advanceQuestStep();
          }
        }
      } else {
        setResult(`I couldn't find a specific answer for "${input}". Try queries like:\n• "Show me all Gold tier customers"\n• "Which products come from Ethiopia?"\n• "What orders did Alex Rivera place?"`);
        clearHighlights();
      }
      
      setIsProcessing(false);
    }, 800);
  }, [input, setHighlightedEntities, setHighlightedRelationships, clearHighlights, activeQuest, currentStepIndex, advanceQuestStep]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuery();
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    clearHighlights();
  };

  const sampleQueries = [
    "Show me all Gold tier customers",
    "Which products come from Ethiopia?",
    "What orders did Alex Rivera place?",
    "List all organic products",
    "Show supply chain for Cosmic Latte"
  ];

  return (
    <div className="query-section">
      <div className="section-title">
        <Sparkles size={14} />
        Natural Language Query (NL2Ontology)
      </div>
      
      <div className="query-input-container">
        <input
          type="text"
          className="query-input"
          placeholder="Ask a question about your data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {input && (
          <button className="icon-btn" onClick={handleClear} title="Clear">
            <X size={18} />
          </button>
        )}
        <button 
          className="btn btn-primary" 
          onClick={handleQuery}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={18} />
            </motion.div>
          ) : (
            <Search size={18} />
          )}
        </button>
      </div>

      {!result && !isProcessing && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>
            Try asking:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {sampleQueries.slice(0, 3).map((query, index) => (
              <button
                key={index}
                onClick={() => setInput(query)}
                style={{
                  padding: '4px 10px',
                  fontSize: 11,
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="query-result"
          >
            {result}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
