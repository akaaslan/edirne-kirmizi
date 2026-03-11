import React, { useState, useEffect } from 'react';
import { MdEdit, MdSave, MdArticle, MdDelete } from 'react-icons/md';
import { api } from '../../services/api';

export default function ContentTab() {
  const [loading, setLoading] = useState(true);

  // Blog posts from backend
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', excerpt: '', published: false });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const data = await api.getAllBlogPosts();
      setBlogPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setBlogPosts([]);
      setLoading(false);
    }
  };

  const handleSavePost = async () => {
    try {
      if (editingPost) {
        const updated = await api.updateBlogPost(editingPost.id, editingPost);
        setBlogPosts(blogPosts.map(p => p.id === editingPost.id ? (updated || editingPost) : p));
        setEditingPost(null);
        alert('Blog yazısı güncellendi! ✅');
      } else if (newPost.title && newPost.content) {
        const created = await api.createBlogPost({
          title: newPost.title,
          content: newPost.content,
          excerpt: newPost.excerpt || newPost.content.substring(0, 150),
          published: newPost.published
        });
        setBlogPosts([created, ...blogPosts]);
        setNewPost({ title: '', content: '', excerpt: '', published: false });
        alert('Blog yazısı oluşturuldu! ✅');
      } else {
        alert('Lütfen başlık ve içerik giriniz!');
      }
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Kaydetme işlemi başarısız!');
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return;
    try {
      await api.deleteBlogPost(id);
      setBlogPosts(blogPosts.filter(p => p.id !== id));
      alert('Yazı silindi! ✅');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Silme işlemi başarısız!');
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      await api.toggleBlogPublish(post.id);
      setBlogPosts(blogPosts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ));
    } catch (err) {
      console.error('Error toggling publish:', err);
      alert('Yayın durumu değiştirilemedi!');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h2 style={{
        fontSize: '1.75rem',
        margin: '0 0 2rem 0',
        color: 'var(--dark)'
      }}>
        <MdArticle style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
        Blog Yönetimi
      </h2>

      {/* New Post Form */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1.5rem' }}>
          {editingPost ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
        </h3>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Başlık
            </label>
            <input
              type="text"
              value={editingPost ? editingPost.title : newPost.title}
              onChange={(e) => editingPost 
                ? setEditingPost({ ...editingPost, title: e.target.value })
                : setNewPost({ ...newPost, title: e.target.value })
              }
              placeholder="Blog yazısı başlığı"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Özet
            </label>
            <input
              type="text"
              value={editingPost ? (editingPost.excerpt || '') : newPost.excerpt}
              onChange={(e) => editingPost 
                ? setEditingPost({ ...editingPost, excerpt: e.target.value })
                : setNewPost({ ...newPost, excerpt: e.target.value })
              }
              placeholder="Kısa bir özet..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              İçerik
            </label>
            <textarea
              value={editingPost ? editingPost.content : newPost.content}
              onChange={(e) => editingPost 
                ? setEditingPost({ ...editingPost, content: e.target.value })
                : setNewPost({ ...newPost, content: e.target.value })
              }
              rows={8}
              placeholder="Blog yazısı içeriği..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={editingPost ? editingPost.published : newPost.published}
              onChange={(e) => editingPost 
                ? setEditingPost({ ...editingPost, published: e.target.checked })
                : setNewPost({ ...newPost, published: e.target.checked })
              }
              id="publish"
            />
            <label htmlFor="publish">Hemen yayınla</label>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleSavePost}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem',
                flex: 1,
                background: 'var(--edirne)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              <MdSave size={20} /> {editingPost ? 'Güncelle' : 'Kaydet'}
            </button>
            {editingPost && (
              <button
                onClick={() => setEditingPost(null)}
                style={{
                  padding: '0.875rem 1.5rem',
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                İptal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Existing Posts */}
      {blogPosts.length === 0 ? (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <MdArticle size={48} color="#6c757d" style={{ marginBottom: '1rem' }} />
          <p style={{ color: '#6c757d' }}>Henüz blog yazısı bulunmuyor.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {blogPosts.map(post => (
            <div
              key={post.id}
              style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                    {post.title}
                  </h4>
                  <p style={{ margin: '0 0 0.75rem 0', color: '#6c757d' }}>
                    {(post.excerpt || post.content || '').substring(0, 120)}...
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#6c757d' }}>
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('tr-TR') : '-'}</span>
                    {post.author && <span>Yazar: {post.author}</span>}
                    <button
                      onClick={() => handleTogglePublish(post)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: post.published ? 'rgba(40, 167, 69, 0.1)' : 'rgba(108, 117, 125, 0.1)',
                        color: post.published ? '#28a745' : '#6c757d',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {post.published ? 'Yayında' : 'Taslak'}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setEditingPost({ ...post })}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#7a1419',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    <MdEdit style={{ verticalAlign: 'middle' }} /> Düzenle
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    <MdDelete style={{ verticalAlign: 'middle' }} /> Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
