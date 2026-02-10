echo "Cleaning up Next.js dev server..."
taskkill /F /IM node.exe /T
rmdir /s /q .next
echo "Cleanup complete. Try running 'npm run dev' now."
