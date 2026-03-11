import React, { useState } from 'react';
import { MdEdit, MdSave, MdImage, MdArticle, MdAnnouncement } from 'react-icons/md';

export default function ContentTab() {
  const [activeSection, setActiveSection] = useState('homepage');
  
  // Homepage content
  const [homepage, setHomepage] = useState({
    heroTitle: 'Edirne Kırmızısı',
    heroSubtitle: 'Geleneksel Türk el işi ürünleri',
    heroImage: '/hero-image.jpg',
    aboutText: 'Edirne\'nin geleneksel el sanatları...'
  });

  // Blog posts
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Edirne Kırmızısının Tarihi',
      content: 'Edirne kırmızısı, yüzyıllardır...',
      date: '2024-01-15',
      published: true
    },
    {
      id: 2,
      title: 'Geleneksel Dokuma Teknikleri',
      content: 'El dokuması ürünlerimiz...',
      date: '2024-01-10',
      published: true
    }
  ]);

  // Announcements
  // eslint-disable-next-line no-unused-vars
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Yeni Koleksiyon Çıktı!',
      message: 'Yeni bahar koleksiyonumuzu keşfedin.',
      active: true,
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    }
  ]);

  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', published: false });

  const handleSaveHomepage = () => {
    alert('Ana sayfa içeriği güncellendi! ✅');
  };

  const handleSavePost = () => {
    if (editingPost) {
      setBlogPosts(blogPosts.map(p => 
        p.id === editingPost.id ? editingPost : p
      ));
      setEditingPost(null);
    } else if (newPost.title) {
      setBlogPosts([...blogPosts, {
        ...newPost,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewPost({ title: '', content: '', published: false });
    }
    alert('Blog yazısı kaydedildi! ✅');
  };

  const handleDeletePost = (id) => {
    if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      setBlogPosts(blogPosts.filter(p => p.id !== id));
      alert('Yazı silindi! ✅');
    }
  };

  return (
    <div>
      {/* Header */}
      <h2 style={{
        fontSize: '1.75rem',
        margin: '0 0 2rem 0',
        color: 'var(--dark)'
      }}>
        İçerik Yönetimi
      </h2>

      {/* Section Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #e9ecef',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveSection('homepage')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'homepage' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'homepage' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdImage style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Ana Sayfa
        </button>
        <button
          onClick={() => setActiveSection('blog')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'blog' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'blog' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdArticle style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Blog
        </button>
        <button
          onClick={() => setActiveSection('announcements')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: activeSection === 'announcements' ? 'var(--edirne)' : '#6c757d',
            border: 'none',
            borderBottom: activeSection === 'announcements' ? '3px solid var(--edirne)' : 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          <MdAnnouncement style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Duyurular
        </button>
      </div>

      {/* Homepage Section */}
      {activeSection === 'homepage' && (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Ana Sayfa İçeriği</h3>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Hero Başlık
              </label>
              <input
                type="text"
                value={homepage.heroTitle}
                onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })}
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
                Hero Alt Başlık
              </label>
              <input
                type="text"
                value={homepage.heroSubtitle}
                onChange={(e) => setHomepage({ ...homepage, heroSubtitle: e.target.value })}
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
                Hakkımızda Metni
              </label>
              <textarea
                value={homepage.aboutText}
                onChange={(e) => setHomepage({ ...homepage, aboutText: e.target.value })}
                rows={5}
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
            <button
              onClick={handleSaveHomepage}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem',
                background: 'var(--edirne)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              <MdSave size={20} /> Kaydet
            </button>
          </div>
        </div>
      )}

      {/* Blog Section */}
      {activeSection === 'blog' && (
        <div>
          {/* New Post Form */}
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Yeni Blog Yazısı</h3>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Başlık
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
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
                  İçerik
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={5}
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
                  checked={newPost.published}
                  onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                  id="publish"
                />
                <label htmlFor="publish">Hemen yayınla</label>
              </div>
              <button
                onClick={handleSavePost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem',
                  background: 'var(--edirne)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                <MdSave size={20} /> Kaydet
              </button>
            </div>
          </div>

          {/* Existing Posts */}
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
                      {post.content.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#6c757d' }}>
                      <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: post.published ? 'rgba(40, 167, 69, 0.1)' : 'rgba(108, 117, 125, 0.1)',
                        color: post.published ? '#28a745' : '#6c757d',
                        borderRadius: '20px'
                      }}>
                        {post.published ? 'Yayında' : 'Taslak'}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditingPost(post)}
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
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Section */}
      {activeSection === 'announcements' && (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Aktif Duyurular</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {announcements.map(announcement => (
              <div
                key={announcement.id}
                style={{
                  padding: '1rem',
                  border: '2px solid #ffc107',
                  borderRadius: '8px',
                  background: 'rgba(255, 193, 7, 0.05)'
                }}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--dark)' }}>
                  {announcement.title}
                </h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d' }}>
                  {announcement.message}
                </p>
                <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                  {new Date(announcement.startDate).toLocaleDateString('tr-TR')} - {new Date(announcement.endDate).toLocaleDateString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
