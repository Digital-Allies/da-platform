// lessons.jsx — authored lesson content + Lesson & Quiz screens.
// Relies on rooms.jsx + components.jsx. Exports to window at the end.

const { useState, useEffect, useRef } = React;

/* =====================================================================
   CONTENT — one authored lesson + knowledge-check per room.
   Each lesson has 3 modules (blocks) and a 3-question quiz. The Lesson
   player titles itself with whichever course the learner opened, but
   draws its body + quiz from the room it belongs to.
   Block types: h (subhead) · p (paragraph) · key (callout) ·
                 list (bullets) · voice (patient quote).
   ===================================================================== */
const LESSON_CONTENT = {
  cs: {
    minutes: 30,
    modules: [
      {
        t: 'Service Is Care',
        blocks: [
          { type: 'p', text: 'Patients rarely remember the details of a procedure. They remember how they were treated while it happened — whether they felt seen, heard, and respected. For most people, the front desk, the phone call, and the waiting room are healthcare. That is where trust is won or lost.' },
          { type: 'key', text: 'The first person a patient speaks to sets the emotional tone for their entire experience of care.' },
          { type: 'p', text: 'Great service in healthcare is not about being polite for its own sake. It is clinical. A patient who feels dismissed is less likely to share symptoms honestly, less likely to follow a care plan, and more likely to delay coming back. Communication is part of the treatment.' },
        ],
      },
      {
        t: 'The Mechanics of a Great Interaction',
        blocks: [
          { type: 'p', text: 'Warmth is a skill, not a personality trait. It can be practiced and repeated, even on a hard day. Four moves do most of the work:' },
          { type: 'list', items: [
            'Greet by name and make eye contact within the first five seconds.',
            'Listen all the way to the end before responding — do not finish their sentence.',
            'Reflect back what you heard so they know they landed: "So the pain started Tuesday."',
            'Close the loop — tell them what happens next and when.',
          ]},
          { type: 'key', text: 'Active listening means the patient feels heard, not that you simply heard them. The difference shows on their face.' },
        ],
      },
      {
        t: 'De-escalating a Difficult Moment',
        blocks: [
          { type: 'p', text: 'Anger in a healthcare setting is almost always fear wearing a different coat. The person raising their voice is usually frightened, in pain, or worried about someone they love. Treat the emotion first and the problem second.' },
          { type: 'list', items: [
            'Lower your own volume — people unconsciously match the calmest voice in the room.',
            'Acknowledge the feeling out loud: "I can see this has been really frustrating."',
            'Never argue about who is right. Move to what you can do next.',
          ]},
          { type: 'voice', text: 'I came in terrified about my results and the woman at the desk just looked at me and said, "We are going to take good care of you." I cried. I still remember her.', by: 'A patient' },
        ],
      },
    ],
    quiz: [
      { q: 'A patient is raising their voice at the front desk. What is the most effective first move?', options: ['Match their energy so they know you are taking it seriously', 'Lower your own voice and acknowledge the feeling', 'Explain the policy that caused the problem', 'Call a supervisor immediately'], answer: 1, explain: 'People unconsciously match the calmest voice in the room. Naming the emotion ("I can see this is frustrating") de-escalates faster than facts.' },
      { q: 'Why is communication considered part of the treatment, not separate from it?', options: ['It makes the day go faster', 'Patients who feel dismissed share less and follow plans less', 'It is required by hospital marketing', 'It shortens appointment times'], answer: 1, explain: 'A patient who does not feel heard withholds information and disengages from their own care — which directly affects outcomes.' },
      { q: 'What does "active listening" actually require?', options: ['Hearing the words the patient says', 'The patient feeling that they were heard', 'Writing down everything verbatim', 'Responding as quickly as possible'], answer: 1, explain: 'Active listening is measured by the patient\u2019s experience of being heard — reflecting their words back is how you prove it.' },
    ],
  },
  hipaa: {
    minutes: 30,
    modules: [
      {
        t: 'What HIPAA Actually Protects',
        blocks: [
          { type: 'p', text: 'HIPAA protects Protected Health Information — PHI — which is any health information tied to a specific person. A diagnosis on its own is not PHI. A diagnosis next to a name, a date of birth, or even a room number is.' },
          { type: 'key', text: 'If information could be used to identify the patient, treat it as PHI. When in doubt, it is in.' },
          { type: 'list', items: [
            'Names, addresses, phone numbers, email',
            'Dates — birth, admission, discharge',
            'Medical record and account numbers',
            'Photos, and anything that could single a person out',
          ]},
        ],
      },
      {
        t: 'The Minimum Necessary Habit',
        blocks: [
          { type: 'p', text: 'The Minimum Necessary Standard is the most useful rule you will learn: access and share only the smallest amount of information needed to do the job in front of you. Curiosity is not a clinical reason.' },
          { type: 'voice', text: 'A nurse looked at my chart out of curiosity because she knew my family. Nothing was shared, but knowing she had read it changed how safe I felt walking back in.', by: 'A patient' },
          { type: 'key', text: 'Accessing a record you are not actively caring for is a violation — even if you never tell a soul.' },
        ],
      },
      {
        t: 'Spotting and Reporting a Breach',
        blocks: [
          { type: 'p', text: 'A breach is any unauthorized access, use, or disclosure of PHI. Most breaches are not dramatic hacks — they are everyday slips: a chart left open, a fax to the wrong number, a screen visible to the waiting room.' },
          { type: 'list', items: [
            'Report immediately — speed limits the harm and is required by law.',
            'Do not try to quietly fix it yourself or hope it goes unnoticed.',
            'Reporting in good faith is protected. Staying silent is the real risk.',
          ]},
          { type: 'key', text: 'A single careless click can expose thousands of patients. Protecting privacy is the trust that makes honest care possible.' },
        ],
      },
    ],
    quiz: [
      { q: 'Which of these counts as PHI?', options: ['A diagnosis with no name attached', 'A patient\u2019s name next to their appointment date', 'A general statistic about flu season', 'An empty medical form'], answer: 1, explain: 'PHI is health information tied to something that could identify the person — a name plus a date qualifies.' },
      { q: 'You recognize a neighbor\u2019s name in the system and open their chart, though you are not on their care team. This is:', options: ['Fine, since you did not share anything', 'A HIPAA violation regardless of sharing', 'Allowed if you work at the same facility', 'Only a problem if they find out'], answer: 1, explain: 'The Minimum Necessary Standard means accessing a record you are not caring for is a violation in itself — sharing is not required.' },
      { q: 'You notice a fax of lab results went to the wrong office. What should you do?', options: ['Wait to see if anyone complains', 'Report it immediately', 'Delete the record of the fax', 'Handle it quietly yourself'], answer: 1, explain: 'Prompt reporting limits harm and is legally required. Good-faith reporting is protected; silence is the real risk.' },
    ],
  },
  compliance: {
    minutes: 30,
    modules: [
      {
        t: 'Compliance Is a Promise You Keep',
        blocks: [
          { type: 'p', text: 'Compliance is how an organization proves — to patients and regulators alike — that it does the right thing even when no one is watching. It is not a binder on a shelf. It is a daily set of small, honest choices.' },
          { type: 'key', text: 'Every compliance rule exists because, somewhere, a patient was harmed when it did not.' },
        ],
      },
      {
        t: 'Fraud, Waste & Abuse in Plain Terms',
        blocks: [
          { type: 'p', text: 'These three words get used together, but they are different things:' },
          { type: 'list', items: [
            'Fraud — knowingly billing for something that did not happen. It is intentional.',
            'Waste — overusing resources through carelessness, not malice.',
            'Abuse — practices that are inconsistent with accepted standards, even without intent to deceive.',
          ]},
          { type: 'p', text: 'The Anti-Kickback Statute and Stark Law exist to keep medical decisions clean — care should be driven by what the patient needs, never by who pays a referral fee.' },
          { type: 'key', text: 'When money quietly steers a clinical decision, the patient is the one who pays for it.' },
        ],
      },
      {
        t: 'Speaking Up Safely',
        blocks: [
          { type: 'p', text: 'If you see something that feels wrong, you are not expected to be certain it is illegal. You are expected to raise it. Whistleblower protections exist precisely so that doing the right thing does not cost you your job.' },
          { type: 'voice', text: 'The billing looked off to me for months. I almost said nothing because I was new. Reporting it turned out to be the most important thing I did all year.', by: 'A billing specialist' },
          { type: 'list', items: [
            'Report concerns through your compliance channel, not the rumor mill.',
            'Retaliation for good-faith reporting is itself a violation.',
          ]},
        ],
      },
    ],
    quiz: [
      { q: 'What distinguishes fraud from waste?', options: ['Fraud is intentional; waste is careless', 'Fraud is small; waste is large', 'They are the same thing', 'Waste is always illegal; fraud is not'], answer: 0, explain: 'Fraud is knowing, intentional deception. Waste is the careless overuse of resources without intent to deceive.' },
      { q: 'Why do the Anti-Kickback Statute and Stark Law exist?', options: ['To increase hospital revenue', 'To keep clinical decisions free of financial influence', 'To reduce paperwork', 'To set prices for procedures'], answer: 1, explain: 'They protect patients by ensuring care is driven by medical need, not by referral fees or financial incentives.' },
      { q: 'You suspect something is being billed improperly but are not certain. You should:', options: ['Say nothing until you have proof', 'Raise it through your compliance channel', 'Confront the person directly', 'Post about it anonymously online'], answer: 1, explain: 'You are expected to report concerns in good faith — certainty is not required, and retaliation for reporting is itself a violation.' },
    ],
  },
  records: {
    minutes: 30,
    modules: [
      {
        t: 'The Record Is the Patient\u2019s Story',
        blocks: [
          { type: 'p', text: 'A medical record is the patient\u2019s story told in clinical form. It is how the next caregiver picks up exactly where the last one left off — at 2am, during a crisis, when the patient cannot speak for themselves.' },
          { type: 'key', text: 'If it is not documented, clinically it did not happen. The record is the memory the whole team shares.' },
        ],
      },
      {
        t: 'Documenting So the Next Person Can Follow',
        blocks: [
          { type: 'p', text: 'Good documentation is written for a stranger — the colleague who has never met this patient and has thirty seconds to understand them. Aim for accurate, timely, objective, and complete.' },
          { type: 'list', items: [
            'Write it now, not at the end of your shift, while memory is sharp.',
            'Record facts and observations, not assumptions or labels.',
            'Never alter a past entry — correct it with a dated addendum.',
          ]},
          { type: 'voice', text: 'I was transferred between three teams in one night. The only reason nothing fell through was that someone wrote it all down clearly.', by: 'A patient' },
        ],
      },
      {
        t: 'Who Gets to See It',
        blocks: [
          { type: 'p', text: 'Patients own their information; the organization is its custodian. Release of Information (ROI) is the formal, consent-driven process for sharing records — and retention rules dictate how long records are kept and when they are securely destroyed.' },
          { type: 'key', text: 'Sharing a record without proper authorization is both a documentation failure and a privacy breach.' },
        ],
      },
    ],
    quiz: [
      { q: 'The phrase "if it is not documented, it did not happen" means:', options: ['You can skip documentation if you remember it', 'The record is the shared, official memory of care', 'Only doctors need to document', 'Documentation is optional for minor events'], answer: 1, explain: 'The record is how the whole care team shares an accurate memory — undocumented care cannot be relied on by the next caregiver.' },
      { q: 'You realize you made an error in a note from yesterday. You should:', options: ['Erase it and rewrite it correctly', 'Add a dated correction or addendum', 'Leave it — it is too late to change', 'Ask a colleague to fix it for you'], answer: 1, explain: 'Past entries are never altered. Errors are corrected transparently with a dated addendum so the record stays trustworthy.' },
      { q: 'Releasing a patient\u2019s records to a third party requires:', options: ['Only a manager\u2019s verbal okay', 'Proper, consent-driven authorization (ROI)', 'Nothing, if they are another provider', 'A note in the chart afterward'], answer: 1, explain: 'Release of Information is a formal, consent-driven process. Sharing without authorization is both a records failure and a privacy breach.' },
    ],
  },
  finance: {
    minutes: 30,
    modules: [
      {
        t: 'The Revenue Cycle, Start to Finish',
        blocks: [
          { type: 'p', text: 'The revenue cycle is the full journey of a single visit\u2019s money — from the moment an appointment is booked to the moment the balance reaches zero. Every step is a chance to get it right, or to pass an error downstream to the patient.' },
          { type: 'list', items: [
            'Registration & insurance verification — catch problems before care, not after.',
            'Charge capture — record what actually happened, accurately.',
            'Claims submission — to the payer, clean and on time.',
            'Statements & collections — what the patient owes, explained clearly.',
          ]},
        ],
      },
      {
        t: 'Coding That Tells the Truth',
        blocks: [
          { type: 'p', text: 'CPT and ICD-10 codes translate care into a shared language for billing. Coding accurately is an ethical act, not just a technical one. Upcoding to a higher-paying code is fraud; undercoding leaves the organization unpaid for real work.' },
          { type: 'key', text: 'The code should describe exactly what happened — no more to earn more, no less to play it safe.' },
        ],
      },
      {
        t: 'Billing With Dignity',
        blocks: [
          { type: 'p', text: 'A medical bill arrives during one of the most vulnerable moments in a person\u2019s life. A confusing or wrong bill does real harm — it erodes trust and can keep people from seeking care at all.' },
          { type: 'voice', text: 'The treatment went fine. It was the bill — six versions, none of them matching — that made me dread going back.', by: 'A patient' },
          { type: 'list', items: [
            'Explain charges in plain language a worried person can follow.',
            'Fix errors quickly and proactively, before the patient has to fight.',
            'Treat collections as a conversation, not a confrontation.',
          ]},
        ],
      },
    ],
    quiz: [
      { q: 'Billing a higher-paying code than the care provided is called:', options: ['Charge capture', 'Upcoding, which is fraud', 'Verification', 'Reconciliation'], answer: 1, explain: 'Upcoding\u2014billing a more expensive code than what occurred\u2014is intentional fraud. The code must describe exactly what happened.' },
      { q: 'Where in the revenue cycle is the best place to catch an insurance problem?', options: ['After the claim is denied', 'During registration and verification, before care', 'At collections', 'When the patient calls to complain'], answer: 1, explain: 'Verifying insurance up front prevents errors from cascading downstream onto the patient and the claim.' },
      { q: 'Why does the brand treat accurate, clear billing as part of patient care?', options: ['It speeds up payment', 'A confusing or wrong bill erodes trust and deters future care', 'It is required for marketing', 'It reduces staffing costs'], answer: 1, explain: 'A bill lands during a vulnerable moment. Errors and confusion do real human harm and can keep people from seeking care.' },
    ],
  },
};

function lessonFor(roomId) { return LESSON_CONTENT[roomId] || LESSON_CONTENT.cs; }

/* ---------- Block renderer ---------- */
function LessonBlocks({ blocks, accent }) {
  return (
    <div className="ls-prose">
      {blocks.map((b, i) => {
        if (b.type === 'h') return <h3 key={i} className="ls-subhead">{b.text}</h3>;
        if (b.type === 'p') return <p key={i} className="ls-p">{b.text}</p>;
        if (b.type === 'key') return (
          <div key={i} className="ls-key" style={{ borderColor: accent }}>
            <i className="ph-fill ph-lightbulb" style={{ color: accent }}></i>
            <p>{b.text}</p>
          </div>
        );
        if (b.type === 'list') return (
          <ul key={i} className="ls-list">
            {b.items.map((it, j) => (
              <li key={j}><i className="ph-bold ph-check" style={{ color: accent }}></i><span>{it}</span></li>
            ))}
          </ul>
        );
        if (b.type === 'voice') return (
          <figure key={i} className="ls-voice" style={{ background: 'var(--bg-card)' }}>
            <i className="ph-fill ph-quotes" style={{ color: accent }}></i>
            <blockquote>{b.text}</blockquote>
            <figcaption>— {b.by}</figcaption>
          </figure>
        );
        return null;
      })}
    </div>
  );
}

/* ---------- Video / player placeholder ---------- */
function LessonPlayer({ room, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="ls-player" style={{ background: room.color }}>
      <div className="ls-player-glyph"><i className={'ph-fill ' + room.icon}></i></div>
      <button className="ls-play" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'}>
        <i className={'ph-fill ' + (playing ? 'ph-pause' : 'ph-play')}></i>
      </button>
      <div className="ls-player-bar">
        <span className="ls-player-time">{playing ? '0:42' : '0:00'}</span>
        <div className="ls-scrub"><div className="ls-scrub-fill" style={{ width: playing ? '14%' : '0%' }}></div></div>
        <span className="ls-player-time">{lessonFor(room.id).minutes}:00</span>
        <span className="ls-cc"><i className="ph ph-closed-captioning"></i> CC</span>
      </div>
      <span className="ls-player-cap">Video lesson · Captions available · Screen-reader friendly</span>
    </div>
  );
}

/* =====================================================================
   LESSON SCREEN — module nav + content + quiz hand-off
   ===================================================================== */
function LessonScreen({ room, course, onBack, onComplete }) {
  const data = lessonFor(room.id);
  const modules = data.modules;
  const steps = modules.length;          // module count; quiz is step === steps
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));
  const [notes, setNotes] = useState('');
  const noteKey = 'htc-notes-' + room.id + '-' + course.t;
  const topRef = useRef(null);

  useEffect(() => {
    try { setNotes(localStorage.getItem(noteKey) || ''); } catch (e) {}
  }, [noteKey]);
  const saveNotes = (v) => { setNotes(v); try { localStorage.setItem(noteKey, v); } catch (e) {} };

  const go = (s) => {
    setStep(s);
    setSeen(prev => new Set(prev).add(s));
    if (topRef.current) topRef.current.scrollIntoView ? window.scrollTo(0, 0) : null;
    window.scrollTo(0, 0);
  };

  const onQuiz = step === steps;
  const accent = room.color;

  return (
    <div className="ls-room" style={{ '--accent': accent, '--tint': room.tint, background: room.tint }} ref={topRef}>
      {/* slim course header */}
      <div className="ls-head" style={{ background: room.color }}>
        <div className="ls-head-inner">
          <button className="ln-back" onClick={onBack}><i className="ph-bold ph-arrow-left"></i> Back to {room.name}</button>
          <div className="ls-head-meta">
            <span className="ls-head-room"><i className={'ph-fill ' + room.icon}></i> Room {room.n} · {room.name}</span>
            <h1 className="ls-head-title">{course.t}</h1>
            <div className="ls-head-tags">
              <span className="ls-htag"><i className="ph ph-clock"></i> {course.min} min</span>
              <span className="ls-htag"><i className="ph ph-stack"></i> {course.lvl}</span>
              <span className="ls-htag"><i className="ph ph-list-checks"></i> {steps} modules + quiz</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ls-body">
        <div className="ln-breadcrumb">
          <span onClick={onBack}>Lobby</span> <i className="ph ph-caret-right"></i>
          <span onClick={onBack}>{room.name}</span> <i className="ph ph-caret-right"></i>
          <strong>{course.t}</strong>
        </div>

        <div className="ls-cols">
          {/* ---- module rail ---- */}
          <aside className="ls-rail">
            <p className="ln-eyebrow">Course Outline</p>
            <ol className="ls-modlist">
              {modules.map((m, i) => (
                <li key={i}
                    className={'ls-mod' + (i === step ? ' is-active' : '') + (seen.has(i) && i !== step ? ' is-seen' : '')}
                    onClick={() => go(i)} style={i === step ? { '--accent': accent } : null}>
                  <span className="ls-mod-num" style={i === step ? { background: accent, color: '#fff', borderColor: accent } : (seen.has(i) ? { color: accent, borderColor: accent } : null)}>
                    {seen.has(i) && i !== step ? <i className="ph-bold ph-check"></i> : (i + 1)}
                  </span>
                  <span className="ls-mod-t">{m.t}</span>
                </li>
              ))}
              <li className={'ls-mod ls-mod-quiz' + (onQuiz ? ' is-active' : '')} onClick={() => go(steps)}>
                <span className="ls-mod-num" style={onQuiz ? { background: accent, color: '#fff', borderColor: accent } : null}><i className="ph ph-exam"></i></span>
                <span className="ls-mod-t">Knowledge Check</span>
              </li>
            </ol>
          </aside>

          {/* ---- main content ---- */}
          <main className="ls-main">
            {onQuiz ? (
              <QuizScreen room={room} course={course} quiz={data.quiz} onPass={onComplete} onReview={() => go(0)} />
            ) : (
              <article className="ls-card">
                {step === 0 && <LessonPlayer room={room} title={course.t} />}
                <div className="ls-modhead">
                  <span className="ls-modhead-eyebrow" style={{ color: accent }}>Module {step + 1} of {steps}</span>
                  <h2 className="ls-modhead-title">{modules[step].t}</h2>
                </div>
                <LessonBlocks blocks={modules[step].blocks} accent={accent} />
                <div className="ls-foot">
                  {step > 0
                    ? <button className="ls-foot-prev" onClick={() => go(step - 1)}><i className="ph-bold ph-arrow-left"></i> Previous</button>
                    : <span />}
                  <button className="ln-btn ln-btn-track ln-btn-md" style={{ background: accent }} onClick={() => go(step + 1)}>
                    {step + 1 < steps ? <>Next module <i className="ph-bold ph-arrow-right"></i></> : <>Take the Knowledge Check <i className="ph-bold ph-arrow-right"></i></>}
                  </button>
                </div>
              </article>
            )}
          </main>

          {/* ---- context rail ---- */}
          <aside className="ls-context">
            <div className="ln-why" style={{ borderTopColor: accent }}>
              <p className="ln-eyebrow" style={{ color: accent }}>Why This Matters</p>
              <p className="ln-why-text">{room.why}</p>
            </div>
            <div className="ls-notes">
              <label className="ln-eyebrow" htmlFor="ls-notebox"><i className="ph ph-pencil-simple"></i> My Notes</label>
              <textarea id="ls-notebox" className="ls-notebox" placeholder="Jot down anything you want to remember…"
                        value={notes} onChange={(e) => saveNotes(e.target.value)} />
              <span className="ls-notes-hint">Saved automatically on this device</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   QUIZ SCREEN
   ===================================================================== */
function QuizScreen({ room, course, quiz, onPass, onReview }) {
  const accent = room.color;
  const [answers, setAnswers] = useState(() => quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = answers.every(a => a !== null);
  const correct = answers.filter((a, i) => a === quiz[i].answer).length;
  const score = Math.round((correct / quiz.length) * 100);
  const passed = score >= 70;

  const pick = (qi, oi) => { if (submitted) return; setAnswers(prev => prev.map((a, i) => i === qi ? oi : a)); };
  const reset = () => { setAnswers(quiz.map(() => null)); setSubmitted(false); window.scrollTo(0, 0); };

  if (submitted) {
    return (
      <div className="qz-result-wrap">
        <div className={'qz-result ' + (passed ? 'is-pass' : 'is-fail')}>
          <div className="qz-result-ring">
            <ProgressRing pct={score} size={120} stroke={12} color={passed ? 'var(--color-success)' : 'var(--color-error)'} label={score + '%'} />
          </div>
          <div className="qz-result-copy">
            <span className="ln-eyebrow" style={{ color: passed ? 'var(--color-success)' : 'var(--color-error)' }}>
              {passed ? 'Knowledge Check Passed' : 'Not Quite Yet'}
            </span>
            <h2 className="qz-result-title">{passed ? 'Nicely done.' : 'Worth another look.'}</h2>
            <p className="qz-result-sub">
              You answered {correct} of {quiz.length} correctly. {passed
                ? 'You\u2019ve completed this course — your progress has been updated.'
                : 'You need 70% to pass. Review the feedback below and try again.'}
            </p>
            <div className="qz-result-cta">
              {passed
                ? <button className="ln-btn ln-btn-track ln-btn-lg" style={{ background: 'var(--color-success)' }} onClick={onPass}><i className="ph-fill ph-seal-check"></i> Mark Course Complete</button>
                : <button className="ln-btn ln-btn-track ln-btn-lg" style={{ background: accent }} onClick={reset}><i className="ph-bold ph-arrow-clockwise"></i> Try Again</button>}
              <button className="ln-btn ln-btn-outline ln-btn-lg" onClick={onReview}>Review Modules</button>
            </div>
          </div>
        </div>

        <div className="qz-feedback">
          {quiz.map((item, qi) => {
            const right = answers[qi] === item.answer;
            return (
              <div key={qi} className={'qz-fb ' + (right ? 'is-right' : 'is-wrong')}>
                <div className="qz-fb-head">
                  <span className="qz-fb-mark" style={{ background: right ? 'var(--color-success)' : 'var(--color-error)' }}>
                    <i className={'ph-bold ' + (right ? 'ph-check' : 'ph-x')}></i>
                  </span>
                  <p className="qz-fb-q">{item.q}</p>
                </div>
                <p className="qz-fb-line"><strong>Your answer:</strong> {item.options[answers[qi]]}</p>
                {!right && <p className="qz-fb-line"><strong>Correct:</strong> {item.options[item.answer]}</p>}
                <p className="qz-fb-explain">{item.explain}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="qz">
      <div className="qz-intro">
        <span className="qz-badge" style={{ background: room.tint, color: accent }}><i className="ph-fill ph-exam"></i> Knowledge Check</span>
        <h2 className="qz-title">Let’s check what stuck.</h2>
        <p className="qz-sub">{quiz.length} quick questions. Score 70% or higher to complete <strong>{course.t}</strong> and update your progress.</p>
      </div>

      {quiz.map((item, qi) => (
        <fieldset key={qi} className="qz-q">
          <legend className="qz-q-legend"><span className="qz-q-num" style={{ color: accent }}>Q{qi + 1}</span> {item.q}</legend>
          <div className="qz-options">
            {item.options.map((opt, oi) => {
              const checked = answers[qi] === oi;
              return (
                <label key={oi} className={'qz-opt' + (checked ? ' is-checked' : '')} style={checked ? { borderColor: accent, background: room.tint } : null}>
                  <input type="radio" name={'q' + qi} checked={checked} onChange={() => pick(qi, oi)} />
                  <span className="qz-opt-dot" style={checked ? { borderColor: accent, background: accent } : null}>{checked && <i className="ph-bold ph-check"></i>}</span>
                  <span className="qz-opt-text">{opt}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="qz-submit">
        <span className="qz-progress">{answers.filter(a => a !== null).length} of {quiz.length} answered</span>
        <button className="ln-btn ln-btn-track ln-btn-lg" style={{ background: allAnswered ? accent : 'var(--color-border-strong)' }}
                disabled={!allAnswered} onClick={() => { setSubmitted(true); window.scrollTo(0, 0); }}>
          Submit Answers <i className="ph-bold ph-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { LESSON_CONTENT, lessonFor, LessonScreen, QuizScreen, LessonBlocks, LessonPlayer });
