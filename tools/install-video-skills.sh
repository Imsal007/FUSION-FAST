#!/usr/bin/env bash
# Installs the video, motion and ads skills used for SAL Digital reels and demo sites.
# Runs at session start in cloud sessions (see .claude/settings.json); safe to run by hand too.
# Installs in the background so the session is not held up. Log: /tmp/video-skills.log
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || [ "${1:-}" = "--force" ] || exit 0
(
  cd /tmp || exit 0
  add() { timeout 240 npx -y skills add "$@" -g -y >/dev/null 2>&1 && echo "ok   $*" || echo "fail $*"; }
  add remotion-dev/skills --all                      # official Remotion
  add heygen-com/hyperframes --all                   # official HyperFrames (HeyGen)
  timeout 240 npx -y hyperframes@latest skills update >/dev/null 2>&1 && echo "ok   hyperframes core"
  add greensock/gsap-skills --all                    # official GSAP
  add lottiefiles/motion-design-skill@motion-design  # LottieFiles
  add emilkowalski/skills@review-animations
  add iart-ai/motion-design-skills@motion-art-direction
  add digitalsamba/claude-code-video-toolkit@ffmpeg
  add cloudai-x/threejs-skills --all
  for s in ad-creative ads social video; do add coreyhaines31/marketingskills@$s; done
  echo "done $(date)"
) > /tmp/video-skills.log 2>&1 &
exit 0
