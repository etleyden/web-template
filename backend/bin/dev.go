package main

import (
	"fmt"
	"io"
	"os"
	"os/exec"
)

func main() {
	// Check if .env exists
	if _, err := os.Stat(".env"); os.IsNotExist(err) {
		fmt.Println(".env not found. Checking for .env.example...")

		// Check if .env.example exists
		if _, err := os.Stat(".env.example"); os.IsNotExist(err) {
			fmt.Println("Neither .env nor .env.example found. Exiting.")
			os.Exit(1)
		} else {
			fmt.Println("Copying .env.example to .env...")
			source, err := os.Open(".env.example")
			if err != nil {
				fmt.Printf("Failed to open .env.example: %v\n", err)
				os.Exit(1)
			}
			defer source.Close()

			destination, err := os.Create(".env")
			if err != nil {
				fmt.Printf("Failed to create .env: %v\n", err)
				os.Exit(1)
			}
			defer destination.Close()

			if _, err := io.Copy(destination, source); err != nil {
				fmt.Printf("Failed to copy .env.example to .env: %v\n", err)
				os.Exit(1)
			}
		}
	}

	// Start the database container using docker-compose
	fmt.Println("Starting the database container...")
	dockerCmd := exec.Command("docker-compose", "up", "-d", "postgres")
	dockerCmd.Stdout = os.Stdout
	dockerCmd.Stderr = os.Stderr
	if err := dockerCmd.Run(); err != nil {
		fmt.Printf("Failed to start the database container: %v\n", err)
		os.Exit(1)
	}

	// Run the TypeScript file watcher
	fmt.Println("Starting TypeScript file watcher...")
	// tsxCmd := exec.Command("npx", "ts-node", "watch", "src/index.ts")
	tsxCmd := exec.Command("nodemon", "--watch", "src/**/*.ts", "--exec", "ts-node src/index.ts")
	tsxCmd.Stdout = os.Stdout
	tsxCmd.Stderr = os.Stderr
	if err := tsxCmd.Run(); err != nil {
		fmt.Printf("Failed to start TypeScript file watcher: %v\n", err)
		os.Exit(1)
	}
}
