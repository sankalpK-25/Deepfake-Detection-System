from __future__ import annotations

from collections import defaultdict
from pathlib import Path


DATASET_DIR = Path("dataset")
IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".gif",
    ".webp",
    ".tif",
    ".tiff",
}


def is_image_file(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS


def count_images_by_folder(root: Path) -> dict[Path, int]:
    counts: dict[Path, int] = defaultdict(int)

    if not root.exists():
        raise FileNotFoundError(f"Dataset folder not found: {root.resolve()}")

    for path in root.rglob("*"):
        if is_image_file(path):
            counts[path.parent] += 1

    return dict(sorted(counts.items(), key=lambda item: str(item[0]).lower()))


def main() -> None:
    folder_counts = count_images_by_folder(DATASET_DIR)

    if not folder_counts:
        print(f"No image files found under {DATASET_DIR.resolve()}")
        return

    total_images = sum(folder_counts.values())
    total_folders = len(folder_counts)

    print(f"Dataset root: {DATASET_DIR.resolve()}")
    print(f"Image extensions counted: {', '.join(sorted(IMAGE_EXTENSIONS))}")
    print(f"Folders containing images: {total_folders}")
    print(f"Total images: {total_images}")
    print()
    print("Detailed distribution by folder:")

    for folder, count in folder_counts.items():
        relative_folder = folder.relative_to(DATASET_DIR)
        print(f"- {relative_folder}: {count}")


if __name__ == "__main__":
    main()
