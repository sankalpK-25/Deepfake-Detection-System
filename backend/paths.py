import os
import sys


def project_root() -> str:
    if getattr(sys, "frozen", False):
        return getattr(sys, "_MEIPASS", os.path.dirname(sys.executable))
    return os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def runtime_root() -> str:
    if getattr(sys, "frozen", False):
        return os.path.dirname(sys.executable)
    return project_root()


def resource_path(*parts: str) -> str:
    return os.path.join(project_root(), *parts)


def writable_path(*parts: str) -> str:
    return os.path.join(runtime_root(), *parts)
