import json
import re
import shlex
import sys


def has_force_push(command):
    lexer = shlex.shlex(command, posix=True, punctuation_chars=";&|()\n")
    lexer.whitespace = " \t\r"
    lexer.whitespace_split = True
    lexer.commenters = ""
    tokens = list(lexer)

    segments = []
    segment = []
    for token in tokens:
        if token and all(char in ";&|()\n" for char in token):
            if segment:
                segments.append(segment)
                segment = []
        else:
            segment.append(token)
    if segment:
        segments.append(segment)

    for segment in segments:
        for index, token in enumerate(segment):
            if token != "git":
                continue
            push_index = index + 1
            while push_index < len(segment):
                option = segment[push_index]
                if option == "push":
                    break
                if option in ("-C", "-c", "--git-dir", "--work-tree", "--namespace", "--config-env"):
                    push_index += 2
                elif option.startswith(("-C", "-c")) or option.startswith("--"):
                    push_index += 1
                else:
                    break
            if push_index >= len(segment) or segment[push_index] != "push":
                continue

            options_ended = False
            for argument in segment[push_index + 1 :]:
                if argument == "--":
                    options_ended = True
                elif argument.startswith("+"):
                    return True
                elif not options_ended and (
                    argument in ("-f", "--force", "--force-with-lease", "--force-if-includes")
                    or re.match(r"^-([^-].*)$", argument)
                    and "f" in argument[1:]
                    or argument.startswith(("--force=", "--force-with-lease=", "--force-if-includes="))
                ):
                    return True
    return False


def main():
    try:
        payload = json.load(sys.stdin)
        command = payload.get("tool_input", {}).get("command", "")
        blocked = isinstance(command, str) and has_force_push(command)
    except (json.JSONDecodeError, TypeError, ValueError):
        blocked = True

    if blocked:
        print(
            json.dumps(
                {
                    "hookSpecificOutput": {
                        "hookEventName": "PreToolUse",
                        "permissionDecision": "deny",
                        "permissionDecisionReason": "強制 push は禁止されています。",
                    }
                }
            )
        )
    else:
        print("{}")


if __name__ == "__main__":
    main()
