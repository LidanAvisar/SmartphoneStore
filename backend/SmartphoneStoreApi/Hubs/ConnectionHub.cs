using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using System;

namespace SmartphoneStoreApi.Hubs
{
    public class ConnectionHub : Hub
    {
        private static ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();

        public override async Task OnConnectedAsync()
        {
            var username = Context.User?.Identity?.Name ?? Context.ConnectionId;
            _connections[Context.ConnectionId] = username;
            await Clients.All.SendAsync("UpdateConnectionStatus", _connections);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _connections.TryRemove(Context.ConnectionId, out _);
            await Clients.All.SendAsync("UpdateConnectionStatus", _connections);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
