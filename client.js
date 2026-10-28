window.__ModuleLoader__.load({
  id: 'dsh-message-box',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'message-box'
    const POS_KEY = 'dsh-message-box:position:v1'

    const DICT = {
      zh: {
        title: '消息盒子',
        empty: '暂时没有新消息',
        emptyHint: '对话执行完成或需要你审批时，会出现在这里',
        approvalMeta: '等待审批 · {tool}',
        questionMeta: '等待你回答',
        doneMeta: '对话已完成',
        allow: '允许一次',
        reject: '拒绝',
        open: '打开对话',
        footer: '审批后任务会继续执行',
        untitled: '未命名对话',
        close: '关闭',
        dragHint: '拖动可调整位置',
      },
      en: {
        title: 'Message box',
        empty: 'No new messages',
        emptyHint: 'Finished conversations and approval requests show up here',
        approvalMeta: 'Waiting for approval · {tool}',
        questionMeta: 'Waiting for your answer',
        doneMeta: 'Conversation finished',
        allow: 'Allow once',
        reject: 'Reject',
        open: 'Open',
        footer: 'The task continues after you answer',
        untitled: 'Untitled conversation',
        close: 'Close',
        dragHint: 'Drag to move',
      },
    }

    const CSS = `
.dsh-mb-root{position:fixed;z-index:40;width:44px;height:44px;pointer-events:none;font-family:var(--dsw-font-family,inherit)}
.dsh-mb-root>*{pointer-events:auto}
.dsh-mb-bell{position:relative;width:44px;height:44px;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;box-shadow:var(--dsw-shadow-lv2,0 4px 12px rgba(0,0,0,.12));transition:background .15s ease,transform .15s ease}
.dsh-mb-bell:hover{background:var(--dsw-alias-bg-layer-2);transform:translateY(-1px)}
.dsh-mb-bell:active{cursor:grabbing}
.dsh-mb-bell[aria-expanded="true"]{background:var(--dsw-alias-bg-layer-2)}
.dsh-mb-badge{position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:var(--dsw-alias-state-error-primary);color:#fff;font-size:11px;line-height:18px;text-align:center;box-shadow:0 0 0 2px var(--dsw-alias-bg-base);pointer-events:none}
.dsh-mb-panel{position:fixed;max-height:min(62vh,540px);display:flex;flex-direction:column;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);border-radius:16px;box-shadow:var(--dsw-shadow-lv3,0 12px 32px rgba(0,0,0,.18));overflow:hidden}
.dsh-mb-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l1);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
.dsh-mb-head:active{cursor:grabbing}
.dsh-mb-title{flex:1;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary)}
.dsh-mb-count{font-size:12px;color:var(--dsw-alias-label-secondary)}
.dsh-mb-close{width:26px;height:26px;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:16px;line-height:1}
.dsh-mb-close:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.1));color:var(--dsw-alias-label-primary)}
.dsh-mb-list{overflow:auto;padding:6px}
.dsh-mb-item{display:flex;gap:10px;padding:10px;border-radius:10px;cursor:pointer}
.dsh-mb-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.08))}
.dsh-mb-ico{width:26px;height:26px;border-radius:8px;flex:none;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.dsh-mb-ico[data-kind="approval"],.dsh-mb-ico[data-kind="question"]{background:var(--dsw-alias-state-warn-secondary,rgba(201,138,46,.18));color:var(--dsw-alias-state-warn-primary)}
.dsh-mb-ico[data-kind="done"]{background:var(--dsw-alias-state-success-tertiary,rgba(47,154,116,.16));color:var(--dsw-alias-state-success-primary)}
.dsh-mb-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.dsh-mb-name{font-size:13px;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsh-mb-meta{font-size:12px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsh-mb-actions{display:flex;gap:6px;margin-top:4px}
.dsh-mb-btn{height:26px;padding:0 10px;border-radius:7px;font-size:12px;cursor:pointer;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary)}
.dsh-mb-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.08))}
.dsh-mb-btn[disabled]{opacity:.5;cursor:default}
.dsh-mb-btn-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.dsh-mb-btn-primary:hover{background:var(--dsw-alias-brand-primary);filter:brightness(1.06)}
.dsh-mb-empty{padding:30px 16px;text-align:center;display:flex;flex-direction:column;gap:6px}
.dsh-mb-empty-title{font-size:13px;color:var(--dsw-alias-label-primary)}
.dsh-mb-empty-hint{font-size:12px;color:var(--dsw-alias-label-secondary)}
.dsh-mb-foot{padding:8px 14px;border-top:1px solid var(--dsw-alias-border-l1);font-size:11px;color:var(--dsw-alias-label-secondary)}
`

    /** Plugin context captured for locale lookup and navigation. */
    let pluginCtx = null

    function ensureStyles() {
      if (typeof document === 'undefined') return () => {}
      const found = document.querySelector('style[data-message-box]')
      if (found) return () => {}
      const tag = document.createElement('style')
      tag.setAttribute('data-message-box', '')
      tag.textContent = CSS
      document.head.appendChild(tag)
      return () => tag.remove()
    }

    function getT() {
      const locale = pluginCtx && pluginCtx.get('locale')
      if (locale && typeof locale.bind === 'function') {
        try {
          const bound = locale.bind(NS)
          if (typeof bound === 'function') return bound
        } catch (error) {
          // Fall through to the built-in dictionary.
        }
      }
      return (key, args) => {
        const raw = DICT.zh[key] ?? key
        return args ? raw.replace(/\{(\w+)\}/g, (_, name) => String(args[name] ?? '')) : raw
      }
    }

    function openConversation(sessionId) {
      try {
        const ui = pluginCtx && pluginCtx.get('uiWorkspace')
        if (ui && typeof ui.openSession === 'function') ui.openSession(sessionId)
      } catch (error) {
        // Navigation failure must not break the inbox.
      }
    }

    function viewport() {
      if (typeof window === 'undefined') return { w: 1200, h: 800 }
      return { w: window.innerWidth || 1200, h: window.innerHeight || 800 }
    }

    function clampPos(position, size) {
      const v = size || viewport()
      return {
        left: Math.min(Math.max(8, position.left), Math.max(8, v.w - 52)),
        top: Math.min(Math.max(8, position.top), Math.max(8, v.h - 52)),
      }
    }

    function defaultPos(size) {
      const v = size || viewport()
      return { left: Math.max(8, v.w - 64), top: Math.max(8, v.h - 64) }
    }

    function readStoredPos() {
      const v = viewport()
      try {
        const raw = window.localStorage.getItem(POS_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Number.isFinite(parsed && parsed.left) && Number.isFinite(parsed && parsed.top)) {
            return clampPos(parsed, v)
          }
        }
      } catch (error) {
        // Stored geometry is optional.
      }
      return defaultPos(v)
    }

    function storePos(position) {
      try {
        window.localStorage.setItem(POS_KEY, JSON.stringify(position))
      } catch (error) {
        // Persistence is optional.
      }
    }

    /** Read one standard snapshot hook without depending on its selector shape. */
    function readHook(hook, fallback) {
      if (typeof hook !== 'function') return fallback
      try {
        return hook((snapshot) => snapshot)
      } catch (error) {
        return fallback
      }
    }

    function eachStatus(status, visit) {
      if (!status) return
      if (typeof status.forEach === 'function') {
        status.forEach((value, key) => visit(key, value))
        return
      }
      if (typeof status === 'object') {
        for (const key of Object.keys(status)) visit(key, status[key])
      }
    }

    function buildItems(sessions, status, t) {
      const byId = sessions && sessions.byId ? sessions.byId : {}
      const items = []
      eachStatus(status, (sessionId, state) => {
        if (!state) return
        const row = byId[sessionId] || {}
        const title = row.title || row.displayTitle || row.name || t('untitled')
        const updatedAt = Number(row.updatedAt || row.time || row.lastUpdated || 0)
        const interaction = state.pendingInteraction
        if (interaction) {
          const kind = interaction.kind === 'approval' ? 'approval' : 'question'
          items.push({
            key: `${kind}:${sessionId}`,
            kind,
            sessionId,
            title,
            interaction,
            toolName: interaction.toolName,
            reason: interaction.reason,
            updatedAt,
          })
          return
        }
        if (state.completionUnread) {
          items.push({ key: `done:${sessionId}`, kind: 'done', sessionId, title, updatedAt })
        }
      })
      const rank = { approval: 0, question: 1, done: 2 }
      items.sort((left, right) => {
        if (rank[left.kind] !== rank[right.kind]) return rank[left.kind] - rank[right.kind]
        return right.updatedAt - left.updatedAt
      })
      return items
    }

    function BellIcon() {
      return h(
        'svg',
        { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', 'aria-hidden': 'true' },
        h('path', {
          d: 'M6 9a6 6 0 0 1 12 0c0 3 .6 4.7 1.5 6.2.5.8 0 1.8-.9 1.8H5.4c-.9 0-1.4-1-.9-1.8C5.4 13.7 6 12 6 9Z',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M10 20a2.2 2.2 0 0 0 4 0',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
        }),
      )
    }

    function MessageBox(props) {
      const t = getT()
      const sessions = readHook(props && props.useSessions, undefined)
      const status = readHook(props && props.useSessionStatus, undefined)
      const [open, setOpen] = React.useState(false)
      const [busy, setBusy] = React.useState(null)
      const [size, setSize] = React.useState(() => viewport())
      const [pos, setPos] = React.useState(() => readStoredPos())
      const items = buildItems(sessions, status, t)
      const count = items.length

      const posRef = React.useRef(pos)
      posRef.current = pos
      const sizeRef = React.useRef(size)
      sizeRef.current = size
      const dragRef = React.useRef(null)
      const suppressClickRef = React.useRef(false)

      React.useEffect(() => {
        const onResize = () => {
          const next = viewport()
          setSize(next)
          setPos((current) => clampPos(current, next))
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }, [])

      React.useEffect(() => {
        if (!open) return undefined
        const onKey = (event) => {
          if (event.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [open])

      const beginDrag = (event, allowClick) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return
        suppressClickRef.current = false
        dragRef.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          left: posRef.current.left,
          top: posRef.current.top,
          moved: false,
          allowClick,
        }
      }

      const moveDrag = (event) => {
        const drag = dragRef.current
        if (!drag || drag.id !== event.pointerId) return
        const dx = event.clientX - drag.x
        const dy = event.clientY - drag.y
        if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true
        if (!drag.moved) return
        setPos(clampPos({ left: drag.left + dx, top: drag.top + dy }, sizeRef.current))
      }

      const endDrag = (event) => {
        const drag = dragRef.current
        if (!drag || drag.id !== event.pointerId) return
        dragRef.current = null
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch (error) {
          // Capture may already be released.
        }
        if (!drag.moved) return
        if (drag.allowClick) {
          suppressClickRef.current = true
          window.setTimeout(() => {
            suppressClickRef.current = false
          }, 0)
        }
        storePos(posRef.current)
      }

      const bellPointerDown = (event) => {
        beginDrag(event, true)
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch (error) {
          // Pointer capture is a convenience.
        }
      }

      const headPointerDown = (event) => {
        const target = event.target
        if (target && target.closest && target.closest('button')) return
        event.preventDefault()
        beginDrag(event, false)
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch (error) {
          // Pointer capture is a convenience.
        }
      }

      const toggleOpen = () => {
        if (suppressClickRef.current) {
          suppressClickRef.current = false
          return
        }
        setOpen((value) => !value)
      }

      const openItem = (item) => {
        openConversation(item.sessionId)
        setOpen(false)
      }

      const answer = async (item, outcome) => {
        const interaction = item.interaction
        if (!interaction || typeof interaction.answer !== 'function') return
        if (interaction.answerable === false) return
        setBusy(item.key)
        try {
          await interaction.answer(outcome)
        } catch (error) {
          // A withdrawn or replaced request simply disappears from the list.
        } finally {
          setBusy(null)
        }
      }

      const metaOf = (item) => {
        if (item.kind === 'approval') {
          const reason = typeof item.reason === 'string' && item.reason !== '' ? item.reason : null
          return reason || t('approvalMeta', { tool: item.toolName || 'tool' })
        }
        if (item.kind === 'question') return t('questionMeta')
        return t('doneMeta')
      }

      const row = (item) =>
        h(
          'div',
          {
            key: item.key,
            className: 'dsh-mb-item',
            role: 'button',
            tabIndex: 0,
            onClick: () => openItem(item),
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openItem(item)
              }
            },
          },
          h('div', { className: 'dsh-mb-ico', 'data-kind': item.kind, 'aria-hidden': 'true' },
            item.kind === 'done' ? '✓' : '!'),
          h(
            'div',
            { className: 'dsh-mb-main' },
            h('div', { className: 'dsh-mb-name', title: item.title }, item.title),
            h('div', { className: 'dsh-mb-meta' }, metaOf(item)),
            item.kind === 'approval'
              ? h(
                  'div',
                  { className: 'dsh-mb-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-mb-btn dsh-mb-btn-primary',
                      disabled: busy === item.key || item.interaction.answerable === false,
                      onClick: (event) => {
                        event.stopPropagation()
                        answer(item, 'allowed-once')
                      },
                    },
                    t('allow'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-mb-btn',
                      disabled: busy === item.key || item.interaction.answerable === false,
                      onClick: (event) => {
                        event.stopPropagation()
                        answer(item, 'rejected')
                      },
                    },
                    t('reject'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-mb-btn',
                      onClick: (event) => {
                        event.stopPropagation()
                        openItem(item)
                      },
                    },
                    t('open'),
                  ),
                )
              : h(
                  'div',
                  { className: 'dsh-mb-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-mb-btn',
                      onClick: (event) => {
                        event.stopPropagation()
                        openItem(item)
                      },
                    },
                    t('open'),
                  ),
                ),
          ),
        )

      const panelWidth = Math.max(240, Math.min(360, size.w - 32))
      const panelRight = Math.min(
        Math.max(12, size.w - (pos.left + 44)),
        Math.max(12, size.w - panelWidth - 12),
      )
      const panelMaxHeight = Math.min(Math.round((size.h || 800) * 0.62), 540)
      const openUp = pos.top >= panelMaxHeight + 24
      const panelStyle = openUp
        ? { right: panelRight + 'px', bottom: Math.max(12, size.h - pos.top + 10) + 'px', width: panelWidth + 'px' }
        : {
            right: panelRight + 'px',
            top: Math.min(pos.top + 54, Math.max(12, size.h - 180)) + 'px',
            width: panelWidth + 'px',
            maxHeight: Math.max(160, size.h - pos.top - 54 - 16) + 'px',
          }

      return h(
        'div',
        {
          className: 'dsh-mb-root',
          'data-message-box-root': '',
          style: { left: pos.left + 'px', top: pos.top + 'px' },
        },
        open
          ? h(
              'div',
              { className: 'dsh-mb-panel', role: 'dialog', 'aria-label': t('title'), style: panelStyle },
              h(
                'div',
                {
                  className: 'dsh-mb-head',
                  onPointerDown: headPointerDown,
                  onPointerMove: moveDrag,
                  onPointerUp: endDrag,
                  onPointerCancel: endDrag,
                },
                h('div', { className: 'dsh-mb-title' }, t('title')),
                count > 0 ? h('div', { className: 'dsh-mb-count' }, String(count)) : null,
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-mb-close',
                    'aria-label': t('close'),
                    onClick: () => setOpen(false),
                  },
                  '×',
                ),
              ),
              h(
                'div',
                { className: 'dsh-mb-list' },
                count === 0
                  ? h(
                      'div',
                      { className: 'dsh-mb-empty' },
                      h('div', { className: 'dsh-mb-empty-title' }, t('empty')),
                      h('div', { className: 'dsh-mb-empty-hint' }, t('emptyHint')),
                    )
                  : items.map(row),
              ),
              count > 0 ? h('div', { className: 'dsh-mb-foot' }, t('footer')) : null,
            )
          : null,
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-mb-bell',
            'aria-label': t('title'),
            'aria-expanded': open ? 'true' : 'false',
            title: t('title') + ' · ' + t('dragHint'),
            onClick: toggleOpen,
            onPointerDown: bellPointerDown,
            onPointerMove: moveDrag,
            onPointerUp: endDrag,
            onPointerCancel: endDrag,
          },
          h(BellIcon),
          count > 0 ? h('span', { className: 'dsh-mb-badge' }, count > 9 ? '9+' : String(count)) : null,
        ),
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        pluginCtx = ctx

        ctx.effect(() => ensureStyles(), 'message-box styles')

        ctx.effect(() => {
          const locale = ctx.get('locale')
          if (!locale || typeof locale.register !== 'function') return () => {}
          return locale.register(NS, { zh: DICT.zh, en: DICT.en })
        }, 'message-box dictionaries')

        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'message-box',
              order: 60,
              label: () => getT()('title'),
            },
            MessageBox,
          ),
        )
      },
    }
  },
})
